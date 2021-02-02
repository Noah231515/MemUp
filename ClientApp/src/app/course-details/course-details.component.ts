import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../models/course.model';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  public course: Course;
  public constructor(private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.course = this.route.snapshot.data['course'];
  }

}
