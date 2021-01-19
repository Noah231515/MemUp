import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CounterComponent } from "./counter/counter.component";
import { HomeComponent } from "./home/home.component";
import { CourseService } from "./services/course.service";
import { UserDashboardComponent } from "./user-dashboard/user-dashboard.component";
import { SubscribedCoursesResolver } from "./user-dashboard/subscribed-courses.resolver";
import { DashboardAuthenticationResolver } from "./user-dashboard/dashboard-authentication.resolver";

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
      isAuthenticated: DashboardAuthenticationResolver
    }
  },
  {
    path: 'counter',
    component: CounterComponent
  },
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
