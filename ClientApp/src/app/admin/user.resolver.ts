import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resolve } from '@angular/router';
import { UserDto } from '../models/user-dto';

@Injectable({
  providedIn: 'root'
})
export class UsersResolver implements Resolve<UserDto[]> {

  public constructor(private http: HttpClient) { }

  /**
   * Returns all users
   */
  public resolve(): Observable<UserDto[]> {
    return this.getAllUsers();
  }

  /**
   * Returns all users
   */
  public getAllUsers(): Observable<UserDto[]> {
    return this.http.get<any[]>('/users/getallusers');
  }
}
