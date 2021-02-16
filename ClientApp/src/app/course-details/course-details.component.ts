import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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
  @ViewChild(MatPaginator) public paginator: MatPaginator;
  public dataSource: MatTableDataSource<Word>;
  public displayedColumns: string[] = ['Japanese', 'English', 'Sentence'];
  public course: Course;
  public subscribed: string;
  public selectedWords: Word[];
  public selectedTableAction: string;
  private DATA_CHUNK_SIZE = 500;

  public constructor(private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.course = this.route.snapshot.data['course'];
    this.subscribed = this.route.snapshot.queryParams['subscribed'];
    this.dataSource = new MatTableDataSource<Word>(this.course.words.slice(0, this.DATA_CHUNK_SIZE));
    this.selectedWords = [];
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

  public toggleWordStatus(word: Word) {
    const wordIndex = this.selectedWords.findIndex(element => element.id === word.id);
    if (wordIndex === -1) {
      this.selectedWords.push(word);
    } else {
      this.selectedWords.splice(wordIndex, 1);
    }
  }

  public changeSelectedTableAction(event: any) {
    this.selectedTableAction = event.target.value;
  }

  public executeTableAction() {
    switch (this.selectedTableAction) {
      case null:
        break;
      case 'suspend':
          console.log('suspend');
          break;
      case 'restore':
        console.log('restore');
        break;
      case 'edit':
        console.log('edit');
        break;
      case 'reset':
        console.log('reset');
        break;
    }
  }
}
