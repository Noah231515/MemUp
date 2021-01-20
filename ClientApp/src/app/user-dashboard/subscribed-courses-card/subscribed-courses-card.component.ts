import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-subscribed-courses-card',
  templateUrl: './subscribed-courses-card.component.html',
  styleUrls: ['./subscribed-courses-card.component.css'],
})
export class SubscribedCoursesCardComponent implements OnInit {
  @Input() subscribedCourses: Course[];

  constructor() { }

  ngOnInit(): void {
  }

}
