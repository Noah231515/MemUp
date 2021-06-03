import { AfterViewInit, Component, ContentChildren, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Course } from 'src/app/models/course.model';
import { Word } from 'src/app/models/word.model';

@Component({
  selector: 'app-word-table',
  templateUrl: './word-table.component.html',
  styleUrls: ['./word-table.component.css']
})
export class WordTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChildren('wordAnswer') public wordAnswerChildren: QueryList<any>;
  @ViewChildren('sentenceAnswer') public sentenceAnswerChildren: QueryList<any>;
  @Input() public course: Course;
  @Input() public dataSource: Word[];
  @Input() public displayHeader: boolean;
  @Input() public displayAnswers: boolean;
  public wordAnswers;
  public sentenceAnswers;
  public tableData: MatTableDataSource<Word>;
  public displayedColumns: string[] = ['Japanese', 'English', 'Sentence'];
  public selectedWords: Word[];
  public selectedTableAction: string;
  private DATA_CHUNK_SIZE = 500;
  constructor() { }

  public ngOnInit(): void {
    this.tableData = new MatTableDataSource<Word>(this.dataSource.slice(0, this.DATA_CHUNK_SIZE));
    this.selectedWords = [];
  }

  public ngAfterViewInit() {
    this.tableData.paginator = this.paginator;
    this.wordAnswerChildren.changes.subscribe((changes) => {
      this.wordAnswers = changes;
    });
    this.sentenceAnswerChildren.changes.subscribe((changes) => {
      this.sentenceAnswers = changes;
    });

  }

  public checkForAdditionalTableData(pageEvent: PageEvent) {
    if (!this.paginator.hasNextPage()) {
      // Check if we have reached the end of our word list, expand by the data chunk size if not
      // or expand until the end of the word list if so.
      if (pageEvent.length + this.DATA_CHUNK_SIZE < this.course.words.length) {
        this.tableData = new MatTableDataSource<Word>(this.dataSource.slice(0, pageEvent.length + this.DATA_CHUNK_SIZE));
      } else {
        this.tableData = new MatTableDataSource<Word>(this.dataSource);
      }
      this.tableData.paginator = this.paginator;
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

  public toggleVisibility(word: Word, targetArrayType: string, iconRef: any) {
    let targetArray = [];
    switch (targetArrayType) {
      case 'word':
        targetArray = this.wordAnswers.toArray();
        break;
      case 'sentence':
        targetArray = this.sentenceAnswers.toArray();
        break;
      default:
        break;
    }

    targetArray.forEach((elementRef: ElementRef) => {
      if (elementRef.nativeElement.id === word.id) {
        this.changeVisibilityStatus(elementRef, iconRef);
      }
    });
  }

  public changeVisibilityStatus(elementRef: ElementRef, iconRef: any) {
    const className = elementRef.nativeElement.className;
    const icon = iconRef._elementRef.nativeElement;
      const currentStatus = className.search('visible') !== -1 ? 'visible' : 'hidden';
      let newStatus: string;
      switch (currentStatus) {
        case 'visible':
          newStatus = 'hidden';
          icon.innerText = 'visibility_off';
          break;
        case 'hidden':
          newStatus = 'visible';
          icon.innerText = 'visibility_on';
          break;
        default:
          break;
      }
      elementRef.nativeElement.className =  elementRef.nativeElement.className.replace(currentStatus, newStatus);
  }

  public executeTableAction() {
    // Placeholder switch statement to be implemented after
    // database work for per user course management is done
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
