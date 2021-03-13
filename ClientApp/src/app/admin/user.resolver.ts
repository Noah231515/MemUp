import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';
import { UserCourse } from '../models/usercourse.model';
import { Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<any> {

  public constructor(private http: HttpClient) { }

  /**
   * Returns all users
   */
  public resolve(): any {
    return this.getAllUsers();
  }

  /**
   * Returns all users
   */
  public getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>('/users/getallusers');
  }
}
