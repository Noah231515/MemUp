import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-course-summary-card',
  templateUrl: './course-summary-card.component.html',
  styleUrls: ['./course-summary-card.component.css']
})
export class CourseSummaryCardComponent implements OnInit {
  @Input() course: Course;

  constructor() { }

  ngOnInit(): void {
  }

}
