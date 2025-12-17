import { Injectable } from '@nestjs/common';
import { NotesEntity } from './entity/notes.entity';

@Injectable()
export class NotesService {
  constructor(readonly NotesEntity: NotesEntity) {}

  getAll() {
    return this.NotesEntity.Notes;
  }
}
