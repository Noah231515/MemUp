import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Course } from '../models/course.model';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  public isAuthenticated: boolean;
  public subscribedCourses: Course[];
  public newCourses: Course[];

  public constructor(private route: ActivatedRoute, private courseService: CourseService) { }

  public ngOnInit(): void {
    this.isAuthenticated = this.route.snapshot.data['isAuthenticated'];
    this.subscribedCourses = this.route.snapshot.data['subscribedCourses'];
    this.newCourses = this.route.snapshot.data['newCourses'];
  }

  public onUnsubscribe(courseIndex: number) {
    this.newCourses.push(this.subscribedCourses[courseIndex]);
    this.subscribedCourses.splice(courseIndex, 1);
  }

  public onSubscribe(courseIndex: number) {
    this.subscribedCourses.push(this.newCourses[courseIndex]);
    this.newCourses.splice(courseIndex, 1);
  }

  /**
   * Updates the relevant course list when a course is deleted from the database.
   * @param {string} updatedList
   * @memberof UserDashboardComponent
   */
  public updateCourseList(updatedList: string): void {
    if (updatedList === 'new') {
      this.courseService.getNewCourses().subscribe((updatedCourseList) => {
        this.newCourses = updatedCourseList;
      });
    } else if (updatedList === 'subscribed') {
      this.courseService.getSubscribedCourses().subscribe((updatedCourseList) => {
        this.subscribedCourses = updatedCourseList;
      });
    }
  }

}
