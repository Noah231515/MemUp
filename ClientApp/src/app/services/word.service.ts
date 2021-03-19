import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sentence } from '../models/sentence.model';
import { Word } from '../models/word.model';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  public constructor(private http: HttpClient) { }

  /**
   * Get sentences for the provided word
   */
  public getSentences(id: string): Observable<any> {
    return this.http.get(`/words/getsentences/${id}`);
  }


  /**
   * Creates a word in the database using the newWord parameter
   * @param {Word} newWord
   * @return {*}  {Observable<Word>}
   */
  public createWord(newWord: Word): Observable<Word> {
    return this.http.post<Word>(
      `words/createword`,
      newWord,
      {
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        })
      }
    );
  }

  /**
   * Ads the provided word to the provided course
   * @param {Word} word
   * @param {string} courseId
   * @return {*}  {Observable<Word>}
   */
  public addExistingWordToCourse(word: Word, courseId: string): Observable<Word> {
    return this.http.post<Word>(
      `words/addexistingwordtocourse/${courseId}`,
      word,
      {
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        })
      }
    );
  }

  /**
   * Submits a list of words that have had edits made and updates their entries in the database
   * @param {string} id
   * @return {*}  {Observable<UserCourse>}
   */
  public updateWords(updatedWords: Word[]): Observable<Word[]> {
    return this.http.put<Word[]>(
      `words/updatewords`,
      updatedWords,
      {
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        })
      }
      );
  }


  /**
   * Gets all word entries from the database
   * @return {*}  {Observable<Word[]>}
   */
  public getAllWords(): Observable<Word[]> {
    return this.http.get<Word[]>('/words/getallwords');
  }

  /**
   * Creates a blank sentence using the sentence type and word provided in params
   * @param {string} sentenceType
   * @param {Word} word
   * @return {*}  {Sentence}
   */
  public createBlankSentence(sentenceType: string, word: Word): Sentence {
    const blankSentence: Sentence = {
      sentenceText: '',
      word: word,
      sentenceType: {
        type: sentenceType,
      },
    };

    return blankSentence;
  }
}
