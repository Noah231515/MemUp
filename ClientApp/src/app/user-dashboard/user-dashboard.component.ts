import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Course } from '../models/course.model';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  public isAuthenticated: boolean;
  public subscribedCourses: any[];
  public newCourses: any[] = [];

  public constructor(private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.isAuthenticated = this.route.snapshot.data['isAuthenticated'];
    this.subscribedCourses = this.route.snapshot.data['subscribedCourses'];
  }

  public onUnsubscribe(courseIndex: number) {
    this.subscribedCourses.splice(courseIndex, 1);
  }

  public onSubscribe(courseIndex: number) {
    this.subscribedCourses.push(this.newCourses[courseIndex]);
    this.newCourses.splice(courseIndex, 1);
  }

}
