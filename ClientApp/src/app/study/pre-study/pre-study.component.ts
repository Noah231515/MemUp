import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { Word } from 'src/app/models/word.model';

@Component({
  selector: 'app-pre-study',
  templateUrl: './pre-study.component.html',
  styleUrls: ['./pre-study.component.css']
})
export class PreStudyComponent implements OnInit {
  @Input() course: Course;
  @Input() allCourses: Course[];
  public sessionSize: number;
  public selectedWords: Word[];
  

  constructor() { }

  ngOnInit(): void {
    this.selectedWords = this.course.words.slice(0, 25);
    this.allCourses.splice(this.allCourses.findIndex(element => element.id === this.course.id),1)
  }

}
