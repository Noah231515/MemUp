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
  public editMode: string;
  public wordToEdit: Word;
  public newWord: Word = new Word();
  public updatedWords: Word[] = [];

  public constructor(
    private wordService: WordService,
    private snackBarService: SnackBarService
  ) { }

  public ngOnInit(): void {
  }

  public submitForm(): void {
     if (this.updatedWords.length > 0) {
      if (confirm('Are you sure you would like to submit your changes?')) {
        this.wordService.updateWords(this.updatedWords).pipe(
          catchError((err) => of(this.snackBarService.handleError(err))))
            .subscribe((res) => {
              if (res) {
                this.snackBarService.openSnackBar('Your changes were submitted successfully.');
                // Reset the course to the ensure that updated word entries are retrieved if the user searches again
                this.courseUpdated.emit();
                this.updatedWords.splice(0);
                this.unsavedChangesAdded.emit(false);
              }
            });
      }
    }
  }

  public setWordToEdit(selectedWord: Word): void {
    this.wordToEdit = selectedWord;
  }

  public clearWordToEdit(): void {
    this.wordToEdit = undefined;
  }

  public addUpdatedWord(updatedWord: Word): void {
    this.wordToEdit = undefined;
    this.updatedWords.push(updatedWord);
    this.unsavedChangesAdded.emit(true);
  }

  public setEditMode(mode: string): void {
    this.editMode = mode;
  }

  public handleWordSelection(selectedWord: Word): void {
    if (this.editMode === 'addExisting') {
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
