import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Course } from '../models/course.model';

@Component({
  selector: 'app-course-manager',
  templateUrl: './course-manager.component.html',
  styleUrls: ['./course-manager.component.css']
})
export class CourseManagerComponent implements OnInit {
  @Input() public course: Course;
  @Output() public courseUpdated = new EventEmitter<Course>();
  public contentToEdit = 'details';


  public constructor() { }

  public ngOnInit(): void {
  }

  public changeEditSection(value: string): void {
      this.contentToEdit = value;
  }

  public updateCourse(updatedCourse: Course) {
    this.courseUpdated.emit(updatedCourse);
  }

}
