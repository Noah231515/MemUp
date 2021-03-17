import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-course-details-editor',
  templateUrl: './course-details-editor.component.html',
  styleUrls: ['./course-details-editor.component.css']
})
export class CourseDetailsEditorComponent implements OnInit {
  @Input() public course: Course;
  @Output() public courseUpdated = new EventEmitter<null>();
  @Output() public courseCreated = new EventEmitter<null>();
  @Output() public unsavedChangesAdded = new EventEmitter<boolean>();
  public courseDetailsForm: FormGroup;
  public formChanged: boolean;

  public constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private snackBarService: SnackBarService,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.initializeForm();
    this.onValueChanges();
  }

  // Listen for value changes and warn the user if there are changes made that have not been submitted
  public onValueChanges(): void {
    this.courseDetailsForm.valueChanges.subscribe((changes) => {
      let changesMade = false;
      for (const [key, value] of Object.entries(changes)) {
        if (this.course === undefined) {
          if (value) {
            changesMade = true;
            this.unsavedChangesAdded.emit(true);
          }
        } else if (this.course[key] !== value) {
          changesMade = true;
          this.unsavedChangesAdded.emit(true);
        }
      }
      this.formChanged = changesMade;
    });
  }

  // Set the default values to empty strings if a course has not been provided (i.e we are creating a new course)
  // or to the current values on the course object if we are editing a course
  public initializeForm(): void {
    this.courseDetailsForm = this.formBuilder.group({
      name: this.course === undefined ? '' : this.course.name,
      description: this.course === undefined ? '' : this.course.description,
      descriptionFull: this.course === undefined ? '' : this.course.descriptionFull,
    });
  }

  public submitForm(): void {
    this.formChanged = undefined;
    const formValues = this.courseDetailsForm.value;

    if (this.course) {
      // Create an updated course object containing the changes we made and send it to the database
      const updatedCourse: Course = {
        id: this.course.id,
        name: formValues.name,
        description: formValues.description,
        descriptionFull: formValues.descriptionFull,
        words: this.course.words
      };

      this.courseService.updateCourse(updatedCourse).pipe(
          catchError((err) => of (this.snackBarService.handleError(err))))
            .subscribe((_updatedCourse: Course) => {
              this.course = _updatedCourse;
              this.courseUpdated.emit();
              this.snackBarService.openSnackBar('Course updated successfully');
      });
    } else {
      // Create a new course object to add to the database
      // For now we use an empty GUID so the backend accepts the data, and a new real GUID will be
      // generated when the course is added to the database.
      const newCourse: Course =   {
        id: '00000000-0000-0000-0000-000000000000',
        name: formValues.name,
        description: formValues.description,
        descriptionFull: formValues.descriptionFull,
        words: []
      };

      this.courseService.createCourse(newCourse).pipe(
        catchError((err) => of(this.snackBarService.handleError(err))))
          .subscribe((_newCourse: Course) => {
            this.courseCreated.emit();
            this.snackBarService.openSnackBar('Course added successfully. Redirecting to course page.');
            setTimeout(() => {
              this.router.navigate(
                ['/course-details/', _newCourse.id], {
                  queryParams: {
                    subscribed: false,
                    editMode: true,
                    contentToEdit: 'content',
                  }
                });
            }, 3000);
          });
    }
  }

  public resetForm(): void {
    this.initializeForm();
    this.formChanged = undefined;
  }
}
