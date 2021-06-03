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
  @Input() studyOptions: StudyOptions;
  @Input() allCourses: Course[];
  @Output() public updateSize = new EventEmitter<number>();
  @Output() public updateType = new EventEmitter<string>();
  @Output() public updateCourse= new EventEmitter<string>();
  public selectedWords: Word[];
  

  constructor(private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.selectedWords = this.studyOptions.course.words.slice(0, this.studyOptions.sessionSize);
  }

  updateOptions(updatedOption: string, updatedValue: any) {
    const invalidValueErorr = new Error("Invalid value provided.");

    try{
      switch (updatedOption) {
        case 'size':
            if (parseInt(updatedValue) !== NaN) {
              this.updateSize.emit(updatedValue);
              this.selectedWords = this.studyOptions.course.words.slice(0, updatedValue);
              break;
            } else {
              throw invalidValueErorr;
            }
        case 'type':
          if(typeof(updatedValue) === "string") {
            this.updateType.emit(updatedValue);
            break;
          } else {
            throw invalidValueErorr;
          }
        case 'course':
          if(typeof(updatedValue) === 'string') {
            this.updateCourse.emit(updatedValue);
            break;
          } else {
            throw invalidValueErorr;
          }
      }
    } catch (e) {
      this.snackBarService.openSnackBar(e);
    }
  }

}
