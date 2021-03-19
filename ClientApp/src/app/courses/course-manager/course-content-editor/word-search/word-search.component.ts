import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { Observable, fromEvent } from 'rxjs';
import { map, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Course } from 'src/app/models/course.model';
import { Word } from 'src/app/models/word.model';
import { WordService } from 'src/app/services/word.service';

@Component({
  selector: 'app-word-search',
  templateUrl: './word-search.component.html',
  styleUrls: ['./word-search.component.css']
})
export class WordSearchComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() public course: Course;
  @Input() public mode: string;
  @Output() public wordSelected = new EventEmitter<Word>();
  @ViewChild('searchInput') public searchInput: ElementRef;
  public words: Word[];
  public searchResults: Word[];


  public constructor(private wordService: WordService) { }

  public ngOnInit(): void {
  }

  public ngOnChanges(): void {
    // Reset the search component when the editing mode is changed
    this.setWordList();
    if (this.searchResults) {
      this.searchInput.nativeElement.value = '';
      this.searchResults = undefined;
    }
  }

  public ngAfterViewInit() {
    // Use typeahead for realtime results as the user inputs their search
    const searchText: Observable<string> =
      fromEvent<any>(this.searchInput.nativeElement, 'keyup')
        .pipe(
          map(event => event.target.value),
          startWith(''),
          debounceTime(200),
          distinctUntilChanged()
        );

    searchText
    .pipe(
      switchMap(search => {
        if (search === '') {
          return of(null);
        }
        // Escape the search for use in regex to account for special characters in the user input
        const escapedSearch = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(`.*${escapedSearch}.*`, 'i');

        // Search for an exact match to the user's input
        const exactMatch = this.words.find(word => word.englishVocab.toUpperCase() === search.toUpperCase());

        // Create an array of words that match the search regex
        const matches: Word[] = this.words.filter(word => word.englishVocab.match(regex));

        // If an exact match exists, look for it in the matches array and remove it, and place it at
        // the beginning of the array as it is most likely the most relevant result to the user's search
        if (exactMatch) {
          const matchIndex = matches.findIndex(word => word.id === exactMatch.id);
          matches.splice(matchIndex, 1);
          matches.unshift(exactMatch);
        }
        return of(matches.slice(0, 11));
      })
    )
    .subscribe((results) => {
      this.searchResults = results;
    });
  }

  public selectWord(word: Word) {
    this.wordSelected.emit(word);
  }

  /**
   * Sets the word list based on what action is being done. Fetch all words from the database if we are adding a word
   * that exists in another course to the current course, or only fetch the words in the current course if trying to
   * make edits.
   */
  public setWordList(): void {
    switch (this.mode) {
      case 'addExisting':
        this.wordService.getAllWords().subscribe((wordList) => {
          this.words = wordList;
        });
        break;
      case 'editExisting':
        this.words = this.course.words;
        break;
    }
  }

}
