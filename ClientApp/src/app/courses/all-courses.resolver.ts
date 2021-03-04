import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';
import { CourseService } from '../services/course.service';

@Injectable({
  providedIn: 'root'
})
export class AllCoursesResolver implements Resolve<Course[]> {

  public constructor(private courseService: CourseService) { }

  /**
   * Gets the user's subscribed courses
   * @param route
   * @param state
   */
  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course[]> {
    return this.courseService.getAllCourses();
  }
}
