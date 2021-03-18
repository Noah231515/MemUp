using MemUp.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Collections.Generic;

namespace MemUp.Services
{
    public class WordsService : IWordsService
    {
        private readonly MemUpDbContext memUpDbContext;

        public WordsService(MemUpDbContext memUpDbContext)
        {
            this.memUpDbContext = memUpDbContext;
        }

        public Word CreateWord(Word newWord)
        {
            try
            {
                newWord.Id = new Guid();
                newWord.DifficultyIndex = memUpDbContext.Word.Count() + 1;
                memUpDbContext.Word.Add(newWord);
                memUpDbContext.SaveChanges();
                return newWord;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        
        public List<Word> UpdateWords(List<Word> updatedWords)
        {
            try 
            {
                foreach (var word in updatedWords) 
                {
                    var wordInDb = memUpDbContext.Word
                    .AsNoTracking()
                    .Include(w => w.Sentences)
                    .ThenInclude(s => s.SentenceType)
                    .SingleOrDefault(w => w.Id == word.Id);
                    wordInDb = word;
                    memUpDbContext.Update(wordInDb); 
                }
                memUpDbContext.SaveChanges();
                return updatedWords;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public Word AddExistingWordToCourse(Word word, Guid courseId)
        {
            try
            {
                
                word.Id = new Guid();
                word.CourseId = courseId;
                foreach (Sentence sentence in word.Sentences)
                {
                    sentence.Id = new Guid();
                    sentence.WordId = word.Id;
                    sentence.SentenceType = memUpDbContext.SentenceType.SingleOrDefault(s => s.Id == sentence.SentenceType.Id);
                }
                memUpDbContext.Word.Add(word);
                memUpDbContext.SaveChanges();

                return word;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<Word> GetAllWords()
        {
            try
            {
                var wordList = memUpDbContext.Word
                    .Include(w => w.Sentences)
                    .ThenInclude(s => s.SentenceType);
                foreach (Word word in wordList)
                {
                    word.Sentences = word.Sentences.OrderBy(s => s.SentenceType.Id).ToList();
                }
                
                return wordList.ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }

    public interface IWordsService
    {
        Word CreateWord(Word newWord);
        Word AddExistingWordToCourse(Word word, Guid courseId);
        List<Word> UpdateWords(List<Word> updatedWords);
        List<Word> GetAllWords();
    }
}
