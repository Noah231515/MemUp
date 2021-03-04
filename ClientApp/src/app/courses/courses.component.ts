import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../models/course.model';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  public courses: Course[];
  public constructor(private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.courses = this.route.snapshot.data['allCourses'];
  }

}
