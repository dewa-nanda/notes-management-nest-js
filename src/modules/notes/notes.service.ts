import { Injectable } from '@nestjs/common';
import { NotesEntity } from './entity/notes.entity';

@Injectable()
export class NotesService {
  constructor(readonly NotesEntity: NotesEntity) {}

  async getAll() {
    return await this.NotesEntity.findAll();
  }
}
