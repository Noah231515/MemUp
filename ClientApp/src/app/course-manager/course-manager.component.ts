import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Course } from '../models/course.model';
import { Word } from '../models/word.model';
import { CourseService } from '../services/course.service';
import { WordService } from '../services/word.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-course-manager',
  templateUrl: './course-manager.component.html',
  styleUrls: ['./course-manager.component.css']
})
export class CourseManagerComponent implements OnInit {
  @Input() public course: Course;
  @Output() public updateCourse = new EventEmitter<Course>();
  public manageCourseForm: FormGroup;
  public contentToEdit = 'details';
  public wordToEdit: Word;
  public updatedWords: Word[] = [];


  public constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private wordSerrvice: WordService) { }

  public ngOnInit(): void {
    this.initializeForm();
  }

  public initializeForm(): void {
    this.manageCourseForm = this.formBuilder.group({
      courseName: this.course.name,
      courseDescShort: this.course.description,
      courseDescFull: this.course.descriptionFull,
    });
  }

  public changeEditSection(value: string): void {
      this.contentToEdit = value;
  }

  public clearWordToEdit(): void {
    this.wordToEdit = undefined;
  }

  public submitForm(): void {
    const formValues = this.manageCourseForm.value;

    // Submit the updated words to the database if there are any
    if (this.updatedWords.length > 0) {
      this.wordSerrvice.updateWords(this.updatedWords).subscribe();
    }

    const updatedCourse: Course = {
      id: this.course.id,
      name: formValues.courseName,
      description: formValues.courseDescShort,
      descriptionFull: formValues.courseDescFull,
      words: this.course.words
    };

    this.courseService.updateCourse(updatedCourse).subscribe((_updatedCourse) => {
      this.course = _updatedCourse;
      this.updateCourse.emit(_updatedCourse);
    });
  }

  public clearForm(): void {
    this.manageCourseForm.reset();
    this.wordToEdit = undefined;
  }

  public setWordToEdit(selectedWord: Word): void {
    this.wordToEdit = selectedWord;
  }

  public addUpdatedWord(word: Word): void {
    this.updatedWords.push(word);
  }

}
