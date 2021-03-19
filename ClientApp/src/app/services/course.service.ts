import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';
import { UserCourse } from '../models/usercourse.model';
import { catchError } from 'rxjs/internal/operators/catchError';
import { SnackBarService } from './snack-bar.service';
import { of } from 'rxjs/internal/observable/of';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  public constructor(private http: HttpClient, private snackBarService: SnackBarService) { }

  /**
   * Get subscribed courses for currently logged in user
   */
  public getSubscribedCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('/courses/getsubscribedcoursesforusers');
  }

  /**
   * Gets the course with the provided id from the database
   * @param {string} id
   * @return {*}  {Observable<Course>}
   */
  public getCourse(id: string): Observable<Course> {
    return this.http.get<Course>(`/courses/getcourse/${id}`);
  }

  /**
   * Gets all courses that currently exist in the database
   * @return {*}  {Observable<Course[]>}
   */
  public getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('/courses/getallcourses');
  }

  /**
   * Gets courses that the user is not currently subscribed to
   * @return {*}  {Observable<Course[]>}
   */
  public getNewCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('/courses/getnewcoursesforusers');
  }

  /**
   * Subscribes the user to the course with the provided id
   * @param {string} id
   * @return {*}  {Observable<UserCourse>}
   */
  public subscribeToCourse(id: string): Observable<UserCourse> {
    return this.http.post<UserCourse>(`/courses/subscribetocourse/${id}`, null);
  }

  /**
   * Unsubscribes the user from the course with the provided id
   * @param {string} id
   * @return {*}  {Observable<UserCourse>}
   */
  public unsubscribeFromcourse(id: string): Observable<UserCourse> {
    return this.http.delete<UserCourse>(`/courses/unsubscribefromcourse/${id}`);
  }

  /**
   * Gets the number of sentences that currently exist in the course
   * @param {Course} course
   * @return {*}  {number}
   */
  public getNumberOfSentences(course: Course): number {
    let sentenceCount = 0;
    course.words.forEach((word) => {
      sentenceCount += word.sentences.length;
    });
    return sentenceCount;
  }

  /**
   * Gets the number of users currently subscribed to the course
   * @param {string} id
   * @return {*}  {Observable<number>}
   */
  public getNumberOfUsers(id: string): Observable<number> {
    return this.http.get<number>(`/courses/getnumberofusers/${id}`);
  }

  /**
   * Updates the course to match the provided updatedCourse parameter
   * @param {Course} updatedCourse
   * @return {*}  {Observable<Course>}
   */
  public updateCourse(updatedCourse: Course): Observable<Course> {
    return this.http.put<Course>(
      `courses/updatecourse/`,
      updatedCourse,
      {
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        })
      }
    );
  }

  /**
   * Creates a new course entry in the database using the provided newCourse parameter
   * @param {Course} newCourse
   * @return {*}  {Observable<Course>}
   */
  public createCourse(newCourse: Course): Observable<Course> {
    return this.http.post<Course>(
      `courses/createcourse/`,
      newCourse,
      {
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        })
      }
    );
  }

  /**
   * Deletes the course provided in the parameters, and all data associated with it including word and sentence data.
   * @param {Course} course
   * @return {*}  {Observable<Course>}
   */
  public deleteCourse(course: Course): Observable<Course> {
    if (prompt(`This will delete this course and all words associated with it permanantly. If you wish to continue please type "${course.name}"`) === course.name) {
      return this.http.delete<Course>(`/courses/deletecourse/${course.id}`).pipe(
        catchError((err) => of(this.snackBarService.handleError(err))))
          .pipe(map((deletedCourse: Course) => {
            if (deletedCourse) {
              this.snackBarService.openSnackBar(`Successfully deleted "${course.name}"`);
              return deletedCourse;
            }
          }));
    } else {
      this.snackBarService.openSnackBar(`Input did not match the course name. The course "${course.name}" has not been deleted.`);
      return null;
    }
  }
}
