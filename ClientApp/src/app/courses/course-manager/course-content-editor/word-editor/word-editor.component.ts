import { OnChanges } from '@angular/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Course } from 'src/app/models/course.model';
import { Word } from 'src/app/models/word.model';
import { CourseService } from 'src/app/services/course.service';
import { WordService } from 'src/app/services/word.service';

@Component({
  selector: 'app-word-editor',
  templateUrl: './word-editor.component.html',
  styleUrls: ['./word-editor.component.css']
})
export class WordEditorComponent implements OnInit, OnChanges {
  @Input() public wordToEdit: Word;
  @Input() public course: Course;
  @Output() public wordUpdated = new EventEmitter<Word>();
  @Output() public wordCreated = new EventEmitter<Word>();
  @Output() public formClosed = new EventEmitter<null>();
  public wordEditorForm: FormGroup;
  public creatingNewWord: boolean;


  public constructor(
    private formBuilder: FormBuilder,
    private wordService: WordService,
    private courseService: CourseService
  ) { }

  public ngOnInit(): void {
    this.creatingNewWord = this.wordToEdit.id ? false : true;
    this.initializeForm();
  }

  public ngOnChanges() {
    this.initializeForm();
  }

  public initializeForm(): void {
    this.wordEditorForm = this.formBuilder.group({
      englishVocab: this.wordToEdit.englishVocab,
      japaneseVocab: this.wordToEdit.japaneseVocab,
      kanaVocab: this.wordToEdit.kanaVocab,
      partOfSpeech: this.wordToEdit.partOfSpeech,
    });
  }

  public submitForm(): void {
    const formValues = this.wordEditorForm.value;

    if (this.creatingNewWord) {
      const newWord: Word = {
        id: '00000000-0000-0000-0000-000000000000',
        courseId: this.course.id,
        englishVocab: formValues.englishVocab,
        japaneseVocab: formValues.japaneseVocab,
        kanaVocab: formValues.kanaVocab,
        partOfSpeech: formValues.partOfSpeech,
        sentences: []
      };
      if (confirm(`Submit "${newWord.englishVocab}" and add it to ${this.course.name}?`)) {
        this.wordService.createWord(newWord).subscribe((createdWord) => {
          this.wordCreated.emit(createdWord);
        });
      }
    } else {
      const updatedWord: Word = {
        id: this.wordToEdit.id,
        courseId: this.wordToEdit.courseId,
        englishVocab: formValues.englishVocab,
        japaneseVocab: formValues.japaneseVocab,
        kanaVocab: formValues.kanaVocab,
        partOfSpeech: formValues.partOfSpeech,
        sentences: this.wordToEdit.sentences
      };
      for (const [key, value] of Object.entries(updatedWord)) {
        if (this.wordToEdit[key] !== value) {
          this.wordUpdated.emit(updatedWord);
          break;
        }
      }
    }
  }

  public clearForm(): void {
    this.initializeForm();
  }

  public closeForm(): void {
    this.formClosed.emit();
  }

}
