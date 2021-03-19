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

  public getAllWords(): Observable<Word[]> {
    return this.http.get<Word[]>('/words/getallwords');
  }

  /**
   * Creates a blank sentence using the sentence type and word provided in params
   * @param {string} sentenceType
   * @param {Word} word
   * @return {*}  {Sentence}
   * @memberof WordService
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
