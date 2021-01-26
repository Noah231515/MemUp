import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserInfoCardComponent } from './user-dashboard/user-info-card/user-info-card.component';
import { SubscribedCoursesCardComponent } from './user-dashboard/subscribed-courses-card/subscribed-courses-card.component';
import { CourseService } from './services/course.service';
import { AppRoutingModule } from './app-routing.module';
import { SubscribedCoursesResolver } from './user-dashboard/subscribed-courses.resolver';
import { CourseSummaryCardComponent } from './user-dashboard/course-summary-card/course-summary-card.component';
import { NewCoursesCardComponent } from './user-dashboard/new-courses-card/new-courses-card.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    UserDashboardComponent,
    UserInfoCardComponent,
    SubscribedCoursesCardComponent,
    CourseSummaryCardComponent,
    NewCoursesCardComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSortModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatDatepickerModule,
    MatMenuModule,
    FlexLayoutModule,
    ApiAuthorizationModule,
  ],
  providers: [
    CourseService,
    SubscribedCoursesResolver,
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
