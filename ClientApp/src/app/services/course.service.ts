import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  public constructor(private http: HttpClient) { }

  /**
   * Get subscribed courses for currently logged in user
   */
  public getSubscribedCourses(): Observable<any> {
    return this.http.get('/courses/getsubscribedcoursesforusers');
  }

  public subscribeToCourse(id: string): Observable<any> {
    return this.http.post(`/courses/subscribetocourse/${id}`, null);
  }

  public unsubscribeFromcourse(id: string): Observable<any> {
    return this.http.delete(`/courses/unsubscribefromcourse/${id}`);
  }
}
