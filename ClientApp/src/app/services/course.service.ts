import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';
import { UserCourse } from '../models/usercourse.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  public constructor(private http: HttpClient) { }

  /**
   * Get subscribed courses for currently logged in user
   */
  public getSubscribedCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('/courses/getsubscribedcoursesforusers');
  }

  public getCourse(id: string): Observable<Course> {
    return this.http.get<Course>(`/courses/getcourse/${id}`);
  }

  public getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('/courses/getallcourses');
  }

  public getNewCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('/courses/getnewcoursesforusers');
  }

  public subscribeToCourse(id: string): Observable<UserCourse> {
    return this.http.post<UserCourse>(`/courses/subscribetocourse/${id}`, null);
  }

  public unsubscribeFromcourse(id: string): Observable<UserCourse> {
    return this.http.delete<UserCourse>(`/courses/unsubscribefromcourse/${id}`);
  }

  public getNumberOfSentences(course: Course): number {
    let sentenceCount = 0;
    course.words.forEach((word) => {
      sentenceCount += word.sentences.length;
    });
    return sentenceCount;
  }

  public getNumberOfUsers(id: string): Observable<number> {
    return this.http.get<number>(`/courses/getnumberofusers/${id}`);
  }
}
