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
  @Output() public wordUpdated = new EventEmitter<Word>();
  @Output() public formClosed = new EventEmitter<null>();


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

    const updatedWord: Word = {
      id: this.word.id,
      englishVocab: formValues.englishVocab,
      japaneseVocab: formValues.japaneseVocab,
      kanaVocab: formValues.kanaVocab,
      partOfSpeech: formValues.partOfSpeech,
      sentences: this.word.sentences
    };

    this.wordUpdated.emit(updatedWord);
  }

  public clearForm(): void {
    this.initializeForm();
  }

  public closeForm(): void {
    this.formClosed.emit(null);
  }

}
