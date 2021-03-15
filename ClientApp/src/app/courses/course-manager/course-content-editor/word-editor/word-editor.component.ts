import { OnChanges } from '@angular/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Word } from 'src/app/models/word.model';
import { WordService } from 'src/app/services/word.service';

@Component({
  selector: 'app-word-editor',
  templateUrl: './word-editor.component.html',
  styleUrls: ['./word-editor.component.css']
})
export class WordEditorComponent implements OnInit, OnChanges {
  @Input() public word: Word;
  @Output() public wordUpdated = new EventEmitter<Word>();
  @Output() public formClosed = new EventEmitter<null>();
  public wordEditorForm: FormGroup;
  public creatingNewWord: boolean;


  public constructor(private formBuilder: FormBuilder, private wordService: WordService) { }

  public ngOnInit(): void {
    this.creatingNewWord = this.word.id ? false : true;
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

    if (this.creatingNewWord) {
      const newWord: Word = {
        id: '00000000-0000-0000-0000-000000000000',
        englishVocab: formValues.englishVocab,
        japaneseVocab: formValues.japaneseVocab,
        kanaVocab: formValues.kanaVocab,
        partOfSpeech: formValues.partOfSpeech,
        sentences: []
      };
      this.wordService.createWord(newWord).subscribe();
    } else {
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
  }

  public clearForm(): void {
    this.initializeForm();
  }

  public closeForm(): void {
    this.formClosed.emit(null);
  }

}
