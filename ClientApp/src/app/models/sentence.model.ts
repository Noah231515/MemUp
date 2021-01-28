import { SentenceType } from './sentence-type.model';
import { Word } from './word.model';

export class Sentence {
  public sentenceText: string;
  public word: Word;
  public sentenceType: SentenceType;
}
