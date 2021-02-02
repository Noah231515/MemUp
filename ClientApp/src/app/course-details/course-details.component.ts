import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../models/course.model';
import { Word } from '../models/word.model';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit, AfterViewInit {
  public course: Course;
  public displayedColumns: string[] = ['Japanese Word', 'English', 'Sentence'];
  public dataSource: MatTableDataSource<Word>;
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  public constructor(private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.course = this.route.snapshot.data['course'];
    this.dataSource = new MatTableDataSource<Word>(this.course.words);
    console.log(this.course);
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
