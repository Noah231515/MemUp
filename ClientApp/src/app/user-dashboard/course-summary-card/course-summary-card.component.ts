import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { EventEmitter } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-summary-card',
  templateUrl: './course-summary-card.component.html',
  styleUrls: ['./course-summary-card.component.css']
})
export class CourseSummaryCardComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  @Input() course: Course;
  @Input() index: number;
  @Input() subscribedStatus: boolean;
  @Output() unsubscribe = new EventEmitter<number>();

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
  }

  subscribeToCourse(){
    this.courseService.subscribeToCourse(this.course.id).subscribe();
  }

  unsubscribeFromCourse(){
    this.courseService.unsubscribeFromcourse(this.course.id).subscribe();
    this.unsubscribe.emit(this.index);
  }

  toggleMenu() {
    this.trigger.toggleMenu();
  }

}
