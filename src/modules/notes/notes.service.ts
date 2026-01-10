import { Injectable } from '@nestjs/common';
import { NotesRepository } from './repositories/notes.repository';

@Injectable()
export class NotesService {
  constructor(readonly NotesEntity: NotesRepository) {}

  async getAll() {
    return await this.NotesEntity.findAll();
  }
}
