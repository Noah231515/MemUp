import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CounterComponent } from "./counter/counter.component";
import { HomeComponent } from "./home/home.component";
import { CourseService } from "./services/course.service";
import { UserDashboardComponent } from "./user-dashboard/user-dashboard.component";
import { UserDashboardResolver } from "./user-dashboard/user-dashboard.resolver";

const routes: Routes = [
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
    {
      path: 'home',
      component: HomeComponent,
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
