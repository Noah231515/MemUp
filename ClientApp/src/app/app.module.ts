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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserInfoCardComponent } from './user-dashboard/user-info-card/user-info-card.component';
import { SubscribedCoursesCardComponent } from './user-dashboard/subscribed-courses-card/subscribed-courses-card.component';
import { CourseService } from './services/course.service';
import { AppRoutingModule } from './app-routing.module';
import { SubscribedCoursesResolver } from './user-dashboard/subscribed-courses.resolver';
import { CourseSummaryCardComponent } from './user-dashboard/course-summary-card/course-summary-card.component';
import { NewCoursesCardComponent } from './user-dashboard/new-courses-card/new-courses-card.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AdminComponent } from './admin/admin.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseManagerComponent } from './courses/course-manager/course-manager.component';
import { WordSearchComponent } from './courses/course-manager/course-content-editor/word-search/word-search.component';
import { WordEditorComponent } from './courses/course-manager/course-content-editor/word-editor/word-editor.component';
import { CourseDetailsEditorComponent } from './courses/course-manager/course-details-editor/course-details-editor.component';
import { CourseContentEditorComponent } from './courses/course-manager/course-content-editor/course-content-editor.component';
import { CourseCreatorComponent } from './courses/course-creator/course-creator.component';
import { CourseDetailsCardComponent } from './courses/course-details/course-details-card/course-details-card.component';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';
import { StudyComponent } from './study/study.component';
import { PreStudyComponent } from './study/pre-study/pre-study.component';
import { StudyGameComponent } from './study/study-game/study-game.component';
import { WordTableComponent } from './courses/word-table/word-table.component';


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
    NewCoursesCardComponent,
    CourseDetailsComponent,
    CourseDetailsCardComponent,
    AdminComponent,
    UserListComponent,
    CoursesComponent,
    CourseManagerComponent,
    WordSearchComponent,
    WordEditorComponent,
    CourseDetailsEditorComponent,
    CourseContentEditorComponent,
    CourseCreatorComponent,
    StudyComponent,
    PreStudyComponent,
    StudyGameComponent,
    WordTableComponent
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
    MatSidenavModule,
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
