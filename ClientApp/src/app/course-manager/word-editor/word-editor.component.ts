import { OnChanges } from '@angular/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Word } from 'src/app/models/word.model';

@Component({
  selector: 'app-word-editor',
  templateUrl: './word-editor.component.html',
  styleUrls: ['./word-editor.component.css']
})
export class WordEditorComponent implements OnInit, OnChanges {
  public wordEditorForm: FormGroup;
  @Input() public word: Word;
  @Output() public wordModified = new EventEmitter<Word>();


  public constructor(private formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this.initializeForm();
  }

  public ngOnChanges() {
    this.initializeForm();
  }

  public initializeForm(): void {
    this.wordEditorForm = this.formBuilder.group({
      englishVocab: this.word.englishVocab,
      japaneseVocab: this.word.japaneseVocab,
      kanaVocab: this.word.kanaVocab,
      partOfSpeech: this.word.partOfSpeech,
    });
  }

  public submitForm(): void {
    const formValues = this.wordEditorForm.value;

    const modifiedWord: Word = {
      id: this.word.id,
      englishVocab: this.word.englishVocab === formValues.englishVocab ? this.word.englishVocab : formValues.englishVocab,
      japaneseVocab: this.word.japaneseVocab === formValues.japaneseVocab ? this.word.japaneseVocab : formValues.japaneseVocab,
      kanaVocab: this.word.kanaVocab === formValues.kanaVocab ? this.word.kanaVocab : formValues.kanaVocab,
      partOfSpeech: this.word.partOfSpeech === formValues.partOfSpeech ? this.word.partOfSpeech : formValues.partOfSpeech,
      sentences: this.word.sentences
    };

    this.wordModified.emit(modifiedWord);
  }

}
