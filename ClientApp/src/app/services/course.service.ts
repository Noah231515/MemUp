import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { Course } from "../models/course.model";

@Injectable({
  providedIn: 'root'
})
export class CourseService implements Resolve<Course> {

  constructor(private http: HttpClient) { }

  public resolve(): Observable<Course> {
    return this.getSubscribedCourses();
  }

  public getSubscribedCourses(): Observable<any> {
    return this.http.get("");
  }
}
