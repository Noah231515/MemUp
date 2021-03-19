import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-manager',
  templateUrl: './course-manager.component.html',
  styleUrls: ['./course-manager.component.css']
})
export class CourseManagerComponent implements OnInit {
  @Input() public course: Course;
  @Output() public courseUpdated = new EventEmitter<null>();
  public unsavedChanges: boolean;
  public contentToEdit: string;


  public constructor(private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.contentToEdit = params.contentToEdit ? params.contentToEdit : 'details';
    });
  }

  public changeEditSection(value: string): void {
      if (this.unsavedChanges) {
        if (confirm('The changes you have made have not been saved and will be lost. Continue anyway?')) {
          this.contentToEdit = value;
          this.unsavedChanges = false;
        }
      } else {
        this.contentToEdit = value;
      }
  }

  public updateCourse(): void {
    this.courseUpdated.emit();
  }

  public setUnsavedChanges(status: boolean): void {
    this.unsavedChanges = status;
  }
}
