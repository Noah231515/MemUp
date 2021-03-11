import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { Observable, fromEvent } from 'rxjs';
import { map, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Word } from 'src/app/models/word.model';

@Component({
  selector: 'app-word-search',
  templateUrl: './word-search.component.html',
  styleUrls: ['./word-search.component.css']
})
export class WordSearchComponent implements OnInit, AfterViewInit {
  public searchResults: Word[];
  @Input() public words: Word[];
  @Output() public wordSelected = new EventEmitter<Word>();
  @ViewChild('searchInput') public searchInput: ElementRef;


  public constructor() { }

  public ngOnInit(): void {
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
        const exactMatch = this.words.find(word => word.englishVocab === search);

        // Create an array of words that match the search regex
        const matches: Word[] = this.words.filter(word => word.englishVocab.match(regex));

        // If an exact match exists, look for it in the matches array and remove it, and place it at
        // the beginning of the array as it is most likely the most relevant result to the user's search
        if (exactMatch) {
          matches.slice(matches.findIndex(word => word === exactMatch), 1);
          matches.unshift(exactMatch);
        }
        return of(matches.slice(0, 24));
      })
    )
    .subscribe((results) => {
      this.searchResults = results;
    });
  }

  public selectWord(word: Word) {
    this.wordSelected.emit(word);
  }

}
