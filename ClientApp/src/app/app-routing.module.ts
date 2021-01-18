import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CounterComponent } from "./counter/counter.component";
import { CourseService } from "./services/course.service";
import { UserDashboardComponent } from "./user-dashboard/user-dashboard.component";
import { UserDashboardResolver } from "./user-dashboard/user-dashboard.resolver";

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
        subscribedCourses: UserDashboardResolver
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
