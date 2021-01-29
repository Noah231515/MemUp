import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { EventEmitter } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-course-summary-card',
  templateUrl: './course-summary-card.component.html',
  styleUrls: ['./course-summary-card.component.css']
})
export class CourseSummaryCardComponent implements OnInit {
  @ViewChild(MatMenuTrigger) public trigger: MatMenuTrigger;
  @Input() public course: Course;
  @Input() public index: number;
  @Input() public subscribedStatus: boolean;
  @Output() public unsubscribe = new EventEmitter<number>();
  @Output() public subscribe = new EventEmitter<number>();

  public constructor(private courseService: CourseService, private snackBarService: SnackBarService) { }

  public ngOnInit(): void {
  }

  public subscribeToCourse() {
    this.courseService.subscribeToCourse(this.course.id).pipe(
      catchError((err) => of(this.handleError(err))))
        .subscribe(() => {
          this.subscribe.emit(this.index);
          this.snackBarService.openSnackBar(`Subscribed to ${this.course.name}.`);
        });
  }

  public unsubscribeFromCourse() {
    this.courseService.unsubscribeFromcourse(this.course.id).pipe(
      catchError((err) => of(this.handleError(err))))
        .subscribe((res) => {
          if (res) {
            this.unsubscribe.emit(this.index);
            this.snackBarService.openSnackBar(`Successfully unsubscribed from ${this.course.name}.`);
          }
        });
  }

  public toggleMenu() {
    this.trigger.toggleMenu();
  }

  public handleError(err) {
    this.snackBarService.openSnackBar(`An error occurred. (Error Code ${err.status})`);

  }
}
