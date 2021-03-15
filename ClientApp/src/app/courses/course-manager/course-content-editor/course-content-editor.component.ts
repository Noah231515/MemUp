import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Course } from 'src/app/models/course.model';
import { Word } from 'src/app/models/word.model';
import { CourseService } from 'src/app/services/course.service';
import { WordService } from 'src/app/services/word.service';

@Component({
  selector: 'app-course-content-editor',
  templateUrl: './course-content-editor.component.html',
  styleUrls: ['./course-content-editor.component.css']
})
export class CourseContentEditorComponent implements OnInit {
  @Input() public course: Course;
  @Input() public mode: string;
  public wordToEdit: Word;
  public newWord: Word = new Word();
  public updatedWords: Word[] = [];

  public constructor(private wordService: WordService, private courseService: CourseService) { }

  public ngOnInit(): void {
  }

  public submitForm(): void {
     if (this.updatedWords.length > 0) {
      this.wordService.updateWords(this.updatedWords).subscribe((result) => {
         // Reset the course to the ensure that updated word entries are retrieved if the user searches again
        this.courseService.getCourse(this.course.id).subscribe(course => this.course = course);
        this.updatedWords.splice(0);
      });
    }
  }

  public clearWordToEdit(): void {
    this.wordToEdit = undefined;
  }

  public addUpdatedWord(updatedWord: Word): void {
    this.wordToEdit = undefined;
    this.updatedWords.push(updatedWord);
  }

  public setWordToEdit(selectedWord: Word): void {
    this.wordToEdit = selectedWord;
  }

}
