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

  public constructor(private courseService: CourseService, private snackBarService: SnackBarService) { }

  public ngOnInit(): void {
  }

  public subscribeToCourse() {
    this.courseService.subscribeToCourse(this.course.id).pipe(
      catchError((err) => of(this.handleError(err))))
        .subscribe(() => {
          this.snackBarService.openSnackBar(`Subscribed to ${this.course.name}.`);
          this.subscribed = 'true';
        });
  }

  public unsubscribeFromCourse() {
    this.courseService.unsubscribeFromcourse(this.course.id).pipe(
      catchError((err) => of(this.handleError(err))))
        .subscribe((res) => {
          if (res) {
            this.snackBarService.openSnackBar(`Successfully unsubscribed from ${this.course.name}.`);
            this.subscribed = 'false';
          }
        });
  }

  public handleError(err) {
    this.snackBarService.openSnackBar(`An error occurred. (Error Code ${err.status})`);
  }
}
