import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
}
