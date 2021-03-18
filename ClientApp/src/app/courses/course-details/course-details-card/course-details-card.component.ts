import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-course-details-card',
  templateUrl: './course-details-card.component.html',
  styleUrls: ['./course-details-card.component.css']
})
export class CourseDetailsCardComponent implements OnInit {
  @Input() public course: Course;
  @Input() public subscribed: string;
  public numberOfSentences: number;
  public numberOfUsers: number;

  public constructor(private courseService: CourseService, private snackBarService: SnackBarService) { }

  public ngOnInit(): void {
    this.numberOfSentences = this.courseService.getNumberOfSentences(this.course);
    this.courseService.getNumberOfUsers(this.course.id).subscribe((res) => {
      this.numberOfUsers = res;
    });
  }

  public subscribeToCourse() {
    this.courseService.subscribeToCourse(this.course.id).pipe(
      catchError((err) => of(this.snackBarService.handleError(err))))
        .subscribe((res) => {
          if (res) {
            this.snackBarService.openSnackBar(`Subscribed to ${this.course.name}.`);
            this.subscribed = 'true';
          }
        });
  }

  public unsubscribeFromCourse() {
    this.courseService.unsubscribeFromcourse(this.course.id).pipe(
      catchError((err) => of(this.snackBarService.handleError(err))))
        .subscribe((res) => {
          if (res) {
            this.snackBarService.openSnackBar(`Successfully unsubscribed from ${this.course.name}.`);
            this.subscribed = 'false';
          }
        });
  }
}
