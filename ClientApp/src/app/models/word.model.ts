import { Sentence } from "./sentence.model";

export class Word {
  public japaneseVocab: string;
  public kanaVocab: string;
  public englishVocab: string;
  public partOfSpeech: string
  public sentences: Sentence[];
}
