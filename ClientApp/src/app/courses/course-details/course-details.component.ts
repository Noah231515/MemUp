import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  public course: Course;
  public subscribed: string;
  public editMode: string;
  public manageContentText: string;

  public constructor(
  private route: ActivatedRoute, 
  private router: Router,
  private courseService: CourseService
  ) { }

  public ngOnInit(): void {
    this.course = this.route.snapshot.data['course'];
    if (this.route.snapshot.queryParams['subscribed']) {
      this.subscribed = this.route.snapshot.queryParams['subscribed'];
    } else {
      this.courseService.getSubscribedCourses().subscribe((subscribedCourses) => {
        this.subscribed = subscribedCourses.find(element => element.id === this.course.id) ? 'true' : 'false';
      });
    }
    this.route.queryParams.subscribe((params) => {
      this.editMode = params.editMode;
      this.manageContentText = this.editMode === 'true' ? 'Display course content' : 'Edit course content';
    });
  }

  public updateCourse(): void {
    this.courseService.getCourse(this.course.id).subscribe((updatedCourse) => {
      this.course = updatedCourse;
    });
  }

  public toggleEditMode() {
    this.editMode = this.editMode === 'true' ? 'false' : 'true';
    this.router.navigate(['/course-details', this.course.id], {
      queryParams: {
        subscribed: this.subscribed,
        editMode: this.editMode,
      }
    });
  }
}
