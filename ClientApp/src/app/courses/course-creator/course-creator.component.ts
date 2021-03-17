import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-course-creator',
  templateUrl: './course-creator.component.html',
  styleUrls: ['./course-creator.component.css']
})
export class CourseCreatorComponent implements OnInit {
  @Output() public courseCreated = new EventEmitter<null>();

  public constructor() { }

  public ngOnInit(): void {
  }

  public emitCourseCreated(): void {
    this.courseCreated.emit(null);
  }

}
