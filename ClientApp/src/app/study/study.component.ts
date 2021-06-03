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

  public changeSessionMode() {
    this.isPreStudy = !this.isPreStudy;
    this.isStudyGame = !this.isStudyGame;
  }

  public updateCourse(newCourseName: string) {
    this.selectedCourse = this.courseList.find(element => element.name === newCourseName);
  }

  public updateSessionSize(newSize: number) {
    this.selectedOptions.sessionSize = newSize;
  }

  public updateSessionType(newType: string) {
    const validSessionTypes = ['multipleChoice', 'typingChallenge', 'mixed'];
    try {
      if (validSessionTypes.find(element => element === newType)) {
        this.selectedOptions.sessionType = newType;
      } else {
        throw new Error('An invalid session type was provided.');
      }
    } catch (error) {
      this.snackBarService.openSnackBar(error);
    }
  }
}
