import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-new-courses-card',
  templateUrl: './new-courses-card.component.html',
  styleUrls: ['./new-courses-card.component.css']
})
export class NewCoursesCardComponent implements OnInit {
  @Input() newCourses: Course[];
  @Output() subscribe = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  emitSubscribe(index){
    this.subscribe.emit(index);
  }
}
