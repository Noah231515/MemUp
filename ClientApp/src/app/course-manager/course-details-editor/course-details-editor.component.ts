import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-details-editor',
  templateUrl: './course-details-editor.component.html',
  styleUrls: ['./course-details-editor.component.css']
})
export class CourseDetailsEditorComponent implements OnInit {
  @Input() public course: Course;
  @Output() public courseUpdated = new EventEmitter<Course>();
  public courseDetailsForm: FormGroup;
  public formChanged: boolean;

  public constructor(private formBuilder: FormBuilder, private courseService: CourseService) { }

  public ngOnInit(): void {
    this.initializeForm();
    this.onValueChanges();
  }

  // Listen for value changes and warn the user if there are changes made that have not been submitted
  public onValueChanges(): void {
    this.courseDetailsForm.valueChanges.subscribe((changes) => {
      let changesMade = false;
      for (const [key, value] of Object.entries(changes)) {
        if (this.course[key] !== value) {
          changesMade = true;
        }
      }
      this.formChanged = changesMade;
    });
  }

  public initializeForm(): void {
    this.courseDetailsForm = this.formBuilder.group({
      name: this.course.name,
      description: this.course.description,
      descriptionFull: this.course.descriptionFull,
    });
  }

  public submitForm(): void {
    this.formChanged = undefined;
    const formValues = this.courseDetailsForm.value;

    const updatedCourse: Course = {
      id: this.course.id,
      name: formValues.name,
      description: formValues.description,
      descriptionFull: formValues.descriptionFull,
      words: this.course.words
    };

    this.courseService.updateCourse(updatedCourse).subscribe((_updatedCourse) => {
      this.course = _updatedCourse;
      this.courseUpdated.emit(_updatedCourse);
    });
  }

  public resetForm(): void {
    this.initializeForm();
    this.formChanged = undefined;
  }
}
