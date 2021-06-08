import { AfterViewInit, Component, ContentChildren, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Course } from 'src/app/models/course.model';
import { Word } from 'src/app/models/word.model';
import { sentenceTypeConstants } from 'src/app/constants/sentence-type.constants'

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
  @Input() public wordDataSource: Word[];
  @Input() public displayHeader: boolean;
  @Input() public displayAnswers: boolean;
  public wordAnswers;
  public sentenceAnswers;
  public tableData: MatTableDataSource<Word>;
  public displayedColumns: string[] = ['Japanese', 'English', 'Sentence'];
  public selectedWords: Word[];
  public selectedTableAction: string;
  public SENTENCE_TYPES = sentenceTypeConstants;
  private DATA_CHUNK_SIZE = 500;
  constructor() { }

  public ngOnInit(): void {
    this.tableData = new MatTableDataSource<Word>(this.wordDataSource.slice(0, this.DATA_CHUNK_SIZE));
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

  /**
   * Checks the word list and expands the table data by the data chunk size if we have not reached the end,
   * otherwise expands the table data to the end of the word list
   * 
   * @param {PageEvent} pageEvent
   * @memberof WordTableComponent
   */
  public checkForAdditionalTableData(pageEvent: PageEvent) {
    if (!this.paginator.hasNextPage()) {
      // Check if we have reached the end of our word list, expand by the data chunk size if not
      // or expand until the end of the word list if so.
      if (pageEvent.length + this.DATA_CHUNK_SIZE < this.course.words.length) {
        this.tableData = new MatTableDataSource<Word>(this.wordDataSource.slice(0, pageEvent.length + this.DATA_CHUNK_SIZE));
      } else {
        this.tableData = new MatTableDataSource<Word>(this.wordDataSource);
      }
      this.tableData.paginator = this.paginator;
    }
  }

  /**
   * Toggles a word as selected/unselected from the word table
   *
   * @param {Word} word
   * @memberof WordTableComponent
   */
  public toggleWordStatus(word: Word) {
    const wordIndex = this.selectedWords.findIndex(element => element.id === word.id);
    if (wordIndex === -1) {
      this.selectedWords.push(word);
    } else {
      this.selectedWords.splice(wordIndex, 1);
    }
  }

  /**
   * Changes the currently selected table action
   *
   * @param {*} event
   * @memberof WordTableComponent
   */
  public changeSelectedTableAction(event: any) {
    this.selectedTableAction = event.target.value;
  }

  /**
   * Toggles the visibility of a word or sentence
   *
   * @param {Word} word
   * @param {string} targetArrayType
   * @param {*} iconRef
   * @memberof WordTableComponent
   */
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

  /**
   * Changes the visibility status of the provided element, and toggles the visibility icon appropriately
   *
   * @param {ElementRef} elementRef
   * @param {*} iconRef
   * @memberof WordTableComponent
   */
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

  /**
   * Executes the currently selected table action on all of the words in the selectedWords array
   *
   * @memberof WordTableComponent
   */
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
