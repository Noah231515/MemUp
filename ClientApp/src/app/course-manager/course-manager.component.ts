import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Course } from '../models/course.model';

@Component({
  selector: 'app-course-manager',
  templateUrl: './course-manager.component.html',
  styleUrls: ['./course-manager.component.css']
})
export class CourseManagerComponent implements OnInit {
   @Input() public course: Course;
  public manageCourseForm: FormGroup;
  public contentToEdit = 'details';


  public constructor(private formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this.initializeForm();
  }

  public initializeForm(): void {
    this.manageCourseForm = this.formBuilder.group({
      courseName: '',
      courseDescShort: '',
      courseDescFull: '',
    });
  }

  public changeEditSection(value: string) {
    this.contentToEdit = value;
  }

}
