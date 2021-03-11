import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Course } from '../models/course.model';
import { Word } from '../models/word.model';
import { CourseService } from '../services/course.service';
import { WordService } from '../services/word.service';
import { MatButtonModule } from '@angular/material/button';

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
