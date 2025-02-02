import { Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Course } from 'src/app/models/course.model';
import { Word } from 'src/app/models/word.model';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { WordService } from 'src/app/services/word.service';

@Component({
  selector: 'app-course-content-editor',
  templateUrl: './course-content-editor.component.html',
  styleUrls: ['./course-content-editor.component.css']
})
export class CourseContentEditorComponent implements OnInit {
  @Input() public course: Course;
  @Output() public courseUpdated = new EventEmitter<null>();
  @Output() public unsavedChangesAdded = new EventEmitter<boolean>();
  public isEditMode: boolean;
  public isSubmitNewMode: boolean;
  public isAddExistingMode: boolean;
  public wordToEdit: Word;
  public newWord: Word = new Word();
  public updatedWords: Word[] = [];

  public constructor(
    private wordService: WordService,
    private snackBarService: SnackBarService
  ) { }

  public ngOnInit(): void {
    // Create a blank word to be passed along to the word editor when submitting a new word
    this.newWord = new Word();
    this.newWord.sentences = [
        this.wordService.createBlankSentence('English', this.newWord),
        this.wordService.createBlankSentence('Japanese', this.newWord),
        this.wordService.createBlankSentence('Furigana', this.newWord),
    ];
  }


  /**
   * After the user confirms their changes, submit them to the database and emit that our course was updated,
   * as well as reset the unsavedChanges property of the Course Manager to false since our changes are no
   * longer pending.
   */
  public submitForm(): void {
    if (this.updatedWords.length > 0) {
      if (confirm('Are you sure you would like to submit your changes?')) {
        this.wordService.updateWords(this.updatedWords).pipe(
          catchError((err) => of(this.snackBarService.handleError(err))))
            .subscribe((res) => {
              if (res) {
                this.snackBarService.openSnackBar('Your changes were submitted successfully.');
                // Reset the course to the ensure that updated word entries are retrieved if the user searches again
                this.updatedWords.splice(0);
                this.courseUpdated.emit();
              }
            });
      }
    }
  }

  public setWordToEdit(selectedWord: Word): void {
    this.wordToEdit = selectedWord;
  }

  public clearWordToEdit(): void {
    this.wordToEdit = null;
  }


  /**
   * Adds the updated word to our updatedWords array and emits that we have changes waiting to be submitted
   * @param {Word} updatedWord
   */
  public addUpdatedWord(updatedWord: Word): void {
    this.wordToEdit = null;
    this.updatedWords.push(updatedWord);
    this.unsavedChangesAdded.emit(true);
  }

  public changeToEditMode(): void {
    this.isEditMode = true;
    this.isSubmitNewMode = false;
    this.isAddExistingMode = false;
  }

  public changeToSubmitNewMode(): void {
    this.isSubmitNewMode = true;
    this.isAddExistingMode = false;
    this.isEditMode = false;
  }

  public changeToAddExistingMode(): void {
    this.isAddExistingMode = true;
    this.isEditMode = false;
    this.isSubmitNewMode = false;
  }

  /**
   * When a word is selected, check if we are adding an existing word or if we want to edit the selected word.
   * If adding a word, prompt the user for confirmation and submit it to the database when confirmation is received.
   * If editing a word, set the "wordToEdit" property to the selected word to open the word editor.
   * @param {Word} selectedWord
   */
  public handleWordSelection(selectedWord: Word): void {
    if (this.isAddExistingMode) {
      if (confirm(`Add "${selectedWord.englishVocab}" to ${this.course.name}?`)) {
        this.wordService.addExistingWordToCourse(selectedWord, this.course.id).pipe(
          catchError((err) => of(this.snackBarService.handleError(err))))
            .subscribe((addedWord: Word) => {
              if (addedWord) {
                  this.snackBarService.openSnackBar(`Successfully added "${addedWord.englishVocab}" to ${this.course.name}`);
                  this.updateCourse();
              }
            });
      }
    } else {
      this.setWordToEdit(selectedWord);
    }
  }

  public updateCourse(): void {
      this.courseUpdated.emit();
  }

}
