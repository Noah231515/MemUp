import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-new-courses-card',
  templateUrl: './new-courses-card.component.html',
  styleUrls: ['./new-courses-card.component.css']
})
export class NewCoursesCardComponent implements OnInit {
  @Input() public newCourses: Course[];
  @Output() public subscribe = new EventEmitter<number>();
  @Output() public courseDeleted = new EventEmitter<null>();
  constructor() { }

  public ngOnInit(): void {
  }

  public emitSubscribe(index) {
    this.subscribe.emit(index);
  }

  public emitCourseDeleted() {
    this.courseDeleted.emit();
  }
}
