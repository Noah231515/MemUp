import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-course-summary-card',
  templateUrl: './course-summary-card.component.html',
  styleUrls: ['./course-summary-card.component.css']
})
export class CourseSummaryCardComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  @Input() course: Course;

  public constructor() { }

 public  ngOnInit(): void {
  }


  public toggleMenu() {
    this.trigger.toggleMenu();
  }

}
