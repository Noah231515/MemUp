import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Course } from '../models/course.model';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course-manager',
  templateUrl: './course-manager.component.html',
  styleUrls: ['./course-manager.component.css']
})
export class CourseManagerComponent implements OnInit {
   @Input() public course: Course;
  public manageCourseForm: FormGroup;
  public contentToEdit = 'details';


  public constructor(private formBuilder: FormBuilder, private courseService: CourseService) { }

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

  public submitForm(): void {
    const formValues = this.manageCourseForm.value;
    const course: Course = {
      id: this.course.id,
      name: formValues.courseName !== '' ? formValues.courseName : this.course.name,
      description: formValues.courseDescShort !== '' ? formValues.courseDescShort : this.course.description,
      descriptionFull: formValues.courseDescFull !== '' ? formValues.courseDescFull : this.course.descriptionFull,
      words: this.course.words
    };
    this.courseService.updateCourse(course).subscribe(console.log);
  }

}
