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
