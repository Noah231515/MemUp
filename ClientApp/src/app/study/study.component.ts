import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../models/course.model';
import { StudyOptions } from '../models/study-options.model';
import { SnackBarService } from '../services/snack-bar.service';


@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css']
})
export class StudyComponent implements OnInit {
  public isPreStudy: boolean;
  public isStudyGame: boolean;
  public courseList: Course[];
  public selectedCourse: Course;
  public selectedOptions: StudyOptions;

  constructor(
    private route: ActivatedRoute,
    private snackBarService: SnackBarService,
  ) { }

  public ngOnInit(): void {
    this.isPreStudy = true;
    this.courseList = this.route.snapshot.data['courseList'];
    this.selectedCourse = this.route.snapshot.data['selectedCourse'];
    this.selectedOptions = {
      sessionSize: 10,
      sessionType: 'multipleChoice',
      course: this.selectedCourse,
    };
  }

  /**
   * Switches between the pre study and study game modes
   *
   * @memberof StudyComponent
   */
  public changeSessionMode() {
    this.isPreStudy = !this.isPreStudy;
    this.isStudyGame = !this.isStudyGame;
  }

  /**
   * Sets the selected course to the updated value emitted by the pre-study component
   *
   * @param {string} newCourseName
   * @memberof StudyComponent
   */
  public updateCourse(newCourseName: string) {
    this.selectedCourse = this.courseList.find(element => element.name === newCourseName);
  }

  /**
   * Sets the session size option to the updated value emitted by the pre-study component
   *
   * @param {number} newSize
   * @memberof StudyComponent
   */
  public updateSessionSize(newSize: number) {
    this.selectedOptions.sessionSize = newSize;
  }

  /**
   * Sets the session type option to the updated value emitted by the pre-study component
   *
   * @param {string} newType
   * @memberof StudyComponent
   */
  public updateSessionType(newType: string) {
    this.selectedOptions.sessionType = newType;
  }
}
