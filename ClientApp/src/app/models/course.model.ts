import { Word } from './word.model';

export class Course {
  public id: string;
  public name: string;
  public description: string;
  public descriptionFull: string;
  public words: Word[];
}
