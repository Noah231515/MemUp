import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../models/course.model';
import { Sentence } from '../models/sentence.model';
import { Word } from '../models/word.model';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit, AfterViewInit {
  public course: Course;
  public displayedColumns: string[] = ['Japanese', 'English', 'Sentence'];
  public dataSource: MatTableDataSource<Word>;
  @ViewChild(MatPaginator) public paginator: MatPaginator;
  private DATA_CHUNK_SIZE = 500;

  public constructor(private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.course = this.route.snapshot.data['course'];
    this.dataSource = new MatTableDataSource<Word>(this.course.words.slice(0, this.DATA_CHUNK_SIZE));
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public checkForAdditionalTableData(pageEvent: PageEvent) {
    if (!this.paginator.hasNextPage()) {
      // Check if we have reached the end of our word list, expand by the data chunk size if not
      // or expand until the end of the word list if so.
      if (pageEvent.length + this.DATA_CHUNK_SIZE < this.course.words.length) {
        this.dataSource = new MatTableDataSource<Word>(this.course.words.slice(0, pageEvent.length + this.DATA_CHUNK_SIZE));
      } else {
        this.dataSource = new MatTableDataSource<Word>(this.course.words);
      }
      this.dataSource.paginator = this.paginator;
    }
  }
}
