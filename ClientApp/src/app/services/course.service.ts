import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  /**
   * Get subscribed courses for currently logged in user
   */
  public getSubscribedCourses(): Observable<any> {
    var result = this.http.get("/courses/getsubscribedcoursesforusers");
    console.log(result);
    return result;
  }
}
