import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService implements Resolve<Course> {

  constructor(private http: HttpClient) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
    return this.getSubscribedCourses();
  }

  /**
   * Get subscribed courses for currently logged in user
   */
  public getSubscribedCourses(): Observable<any> {
    return this.http.get("/courses/getsubscribedcoursesforusers");
  }
}
