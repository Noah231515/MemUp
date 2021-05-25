import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { Word } from 'src/app/models/word.model';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-pre-study',
  templateUrl: './pre-study.component.html',
  styleUrls: ['./pre-study.component.css']
})
export class PreStudyComponent implements OnInit {
  @Input() course: Course;
  @Input() allCourses: Course[];
  @Output() public updateSize = new EventEmitter<number>();
  @Output() public updateType = new EventEmitter<string>();
  @Output() public updateCourse= new EventEmitter<string>();
  public sessionSize: number;
  public selectedWords: Word[];
  

  constructor(private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.selectedWords = this.course.words.slice(0, 25);
  }

  updateOptions(updatedOption: string, updatedValue: any) {
    const invalidValueErorr = new Error("Invalid value provided.");

    try{
      switch (updatedOption) {
        case 'size':
          console.log(typeof(updatedValue))
            if (parseInt(updatedValue) !== NaN) {
              this.updateSize.emit(updatedValue);
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
