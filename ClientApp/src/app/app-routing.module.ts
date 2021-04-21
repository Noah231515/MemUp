import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { SubscribedCoursesResolver } from './user-dashboard/subscribed-courses.resolver';
import { NewCoursesResolver } from './user-dashboard/new-courses.resolver';
import { DashboardAuthenticationResolver } from './user-dashboard/dashboard-authentication.resolver';
import { AdminComponent } from './admin/admin.component';
import { UsersResolver } from "./admin/user.resolver";
import { CoursesComponent } from './courses/courses.component';
import { AllCoursesResolver } from './courses/all-courses.resolver';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';
import { CourseDetailsResolver } from './courses/course-details/course-details.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: UserDashboardComponent,
    pathMatch: 'full',
    resolve: {
      subscribedCourses: SubscribedCoursesResolver,
      newCourses: NewCoursesResolver,
      isAuthenticated: DashboardAuthenticationResolver,
    }
  },
  {
    path: 'counter',
    component: CounterComponent
  },
  {
    path: 'course-details/:id',
    component: CourseDetailsComponent,
    resolve: {
      course: CourseDetailsResolver
    }
  },
  {
    path: 'admin',
    component: AdminComponent,
    resolve: {
      users: UsersResolver
    }
  },
  {
    path: 'courses',
    component: CoursesComponent,
    resolve: {
      allCourses: AllCoursesResolver,
    }
  },
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
