import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';

@Injectable({
  providedIn: 'root'
})
export class CourseDetailsResolver implements Resolve<Course> {

  public constructor(private courseService: CourseService) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
    return this.courseService.getCourse(route.params['id']);
  }
}
