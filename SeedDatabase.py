from openpyxl import load_workbook
import sqlite3

conn = sqlite3.connect('./MemUp.db')
cursor = conn.cursor()

wb = load_workbook(filename = "./vocab.xlsx")
vocab_sheet = wb.active

words = []
sentences = []
sentenceIndex = 1
courseWordIndex = 1

for row in vocab_sheet.iter_rows(values_only=True):
    
    wordData = {
        "id": row[0],
        "vocab_japanese": row[1],
        "vocab_kana": row[2],
        "vocab_furigana": row[3],
        "vocab_english": row[4],
        "pos": row[10]
    }
    
    sentenceData = {
        "sentence_japanese": row[5],
        "sentence_furigana": row[6],
        "sentence_english": row[7],
    }
    
    words.append(wordData)
    
    # Each version of the sentence is treated as a single entry in the table, but all 3 entries are linked to one word, so we insert them as we go through each loop
    # and we use the sentenceIndex to ensure that our Primary Key index increments correctly
    # The sentence table is formatted like so: Id, Sentence, WordId, SentenceType 
    for sentence in sentenceData.values():
        cursor.execute(f"INSERT INTO Sentence VALUES (?, ?, ?, NULL)", [sentenceIndex, sentence, row[0]])
        sentenceIndex = sentenceIndex + 1
    
for wordData in words:
    # Write each word into the Word Table. The Word Table is formatted like so: Id, VocabJapanese, VocabKana, VocabEnglish, PartOfSpeech
    cursor.execute(f"INSERT INTO Word VALUES (?, ?, ?, ?, ?)", [wordData['id'], wordData['vocab_japanese'], wordData['vocab_kana'], wordData['vocab_english'], wordData['pos']])
    
    # Seed the CourseWord joint table, linking all of our words to the default Japanese Core Vocabulary Course
    cursor.execute("INSERT INTO CourseWord VALUES (1, ?, ?)", [wordData['id'], courseWordIndex])
    courseWordIndex = courseWordIndex + 1


conn.commit()
conn.close()





