import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { SubscribedCoursesResolver } from './user-dashboard/subscribed-courses.resolver';
import { NewCoursesResolver } from './user-dashboard/new-courses.resolver';
import { DashboardAuthenticationResolver } from './user-dashboard/dashboard-authentication.resolver';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseDetailsResolver } from './course-details/course-details.resolver';
import { AdminComponent } from './admin/admin.component';
import { UsersResolver } from "./admin/user.resolver";

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
  }
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
