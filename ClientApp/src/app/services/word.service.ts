import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
