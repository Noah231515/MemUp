import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { catchError, map } from 'rxjs/operators'
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WordService {
  
  
  controllerUrl: String = "https://localhost:5001/Word/"

  constructor(private httpClient: HttpClient) { }

  getWords(){
    console.log(this.controllerUrl + 'GetWords')
    return this.httpClient.get(this.controllerUrl + 'GetWords', )
      .pipe(map((response: Response) => response),
      catchError(error => of(`Error: ${error}`)));
  }
}