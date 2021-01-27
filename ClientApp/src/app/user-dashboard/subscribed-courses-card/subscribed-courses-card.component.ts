import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-subscribed-courses-card',
  templateUrl: './subscribed-courses-card.component.html',
  styleUrls: ['./subscribed-courses-card.component.css'],
})
export class SubscribedCoursesCardComponent implements OnInit {
  @Input() public subscribedCourses: Course[];
  @Output() unsubscribe = new EventEmitter<number>();

  public constructor() { }

  public ngOnInit(): void {
  }

  emitUnsubscribe(courseIndex) {
    this.unsubscribe.emit(courseIndex);
  }
}
