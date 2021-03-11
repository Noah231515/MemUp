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

  public updateWords(modifiedWords: Word[]): Observable<Word[]> {
    return this.http.put<Word[]>(
      `words/updatewords`,
      modifiedWords,
      {
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        })
      }
      );
  }
}
