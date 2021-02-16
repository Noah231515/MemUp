import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-course-details-card',
  templateUrl: './course-details-card.component.html',
  styleUrls: ['./course-details-card.component.css']
})
export class CourseDetailsCardComponent implements OnInit {
  @Input() public course: Course;
  @Input() public subscribed: string;


  public constructor() { }

  public ngOnInit(): void {
  }

}
