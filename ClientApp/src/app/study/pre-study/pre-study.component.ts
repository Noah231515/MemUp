import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { StudyOptions } from 'src/app/models/study-options.model';
import { Word } from 'src/app/models/word.model';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-pre-study',
  templateUrl: './pre-study.component.html',
  styleUrls: ['./pre-study.component.css']
})
export class PreStudyComponent implements OnInit {
  @Input() public studyOptions: StudyOptions;
  @Input() public allCourses: Course[];
  @Output() public sizeUpdated = new EventEmitter<number>();
  @Output() public typeUpdated = new EventEmitter<string>();
  @Output() public courseUpdated = new EventEmitter<string>();
  public selectedWords: Word[];
  public SESSION_TYPES = {
    multipleChoice: 'multipleChoice',
    typingChallenge: 'typingChallenge',
    mixed: 'mixed',
  }

  constructor() { }

  public ngOnInit(): void {
    this.selectedWords = this.studyOptions.course.words.slice(0, this.studyOptions.sessionSize);
  }

  /**
   * Updates the session size from based on the session size input value and emits the new value to the Study component
   *
   * @param {number} updatedSize
   * @memberof PreStudyComponent
   */
  public updateSize (updatedSize: number) {
    this.sizeUpdated.emit(updatedSize);
    this.selectedWords = this.studyOptions.course.words.slice(0, updatedSize);
  }

  /**
   * Updates the selected course from based on the course input value and emits the new value to the Study component
   *
   * @param {string} updatedCourseName
   * @memberof PreStudyComponent
   */
  public updateCourse (updatedCourseName: string) {
    this.courseUpdated.emit(updatedCourseName);
  }

  /**
   * Updates the session type from based on the session type input value and emits the new value to the Study component
   *
   * @param {string} updatedType
   * @memberof PreStudyComponent
   */
  public updateType (updatedType: string) {
    this.typeUpdated.emit(updatedType);
  }

}
