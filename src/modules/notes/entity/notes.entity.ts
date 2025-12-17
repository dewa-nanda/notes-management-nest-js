import { Injectable } from '@nestjs/common';
import { Notes } from '../types/note.interface';
import dummyData from '@src/common/data/dummy.json';

@Injectable()
export class NotesEntity {
  public Notes: Notes[] = dummyData;
}
