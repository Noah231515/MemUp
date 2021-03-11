import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Course } from '../models/course.model';
import { Word } from '../models/word.model';
import { CourseService } from '../services/course.service';
import { WordService } from '../services/word.service';

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
  public modifiedWords: Word[] = [];


  public constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private wordSerrvice: WordService) { }

  public ngOnInit(): void {
    this.initializeForm();
  }

  public initializeForm(): void {
    this.manageCourseForm = this.formBuilder.group({
      courseName: '',
      courseDescShort: '',
      courseDescFull: '',
    });
  }

  public changeEditSection(value: string) {
      this.contentToEdit = value;
  }

  public clearWordToEdit() {
    this.wordToEdit = undefined;
  }

  public submitForm(): void {
    const formValues = this.manageCourseForm.value;
    if (this.modifiedWords.length > 0) {
      this.wordSerrvice.updateWords(this.modifiedWords).subscribe()
    }

    const course: Course = {
      id: this.course.id,
      name: formValues.courseName !== '' ? formValues.courseName : this.course.name,
      description: formValues.courseDescShort !== '' ? formValues.courseDescShort : this.course.description,
      descriptionFull: formValues.courseDescFull !== '' ? formValues.courseDescFull : this.course.descriptionFull,
      words: this.course.words
    };
    this.courseService.updateCourse(course).subscribe((updatedCourse) => {
      this.course = updatedCourse;
      this.updateCourse.emit(updatedCourse);
    });
  }

  public setWordToEdit(selectedWord: Word) {
    this.wordToEdit = selectedWord;
  }

  public addModifiedWord(word: Word) {
    this.modifiedWords.push(word);
  }

}
