import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { NotesRepository } from './repositories/notes.repository';
import {
  NoteCreateRequest,
  NoteFilterRequest,
  NoteResponse,
  NoteUpdateRequest,
} from './interfaces/note.interface';
import { Note } from '@prisma/client';
import { createPaginatedResponse } from '@src/common/helpers/response';
import { PaginatedData } from '@src/common/interfaces/api-response';

@Injectable()
export class NotesService {
  constructor(readonly notesEntity: NotesRepository) {}

  async getAll({
    userId,
    page,
    limit,
  }: NoteFilterRequest): Promise<PaginatedData<NoteResponse>> {
    const notes = await this.notesEntity.findAll({ userId, page, limit });

    return createPaginatedResponse(notes.items, notes.meta);
  }

  async getOne({ id }: { id: string }): Promise<Note> {
    const note = await this.notesEntity.findOne({ id });

    if (!note) {
      throw new HttpException('Note Not Found', HttpStatus.NOT_FOUND);
    }

    return note;
  }

  async create({ title, content, userId }: NoteCreateRequest) {
    return await this.notesEntity.create({
      title,
      content,
      userId,
    });
  }

  async update({ id, title, content }: NoteUpdateRequest) {
    await this.getOne({ id });

    return await this.notesEntity.update({
      id,
      title,
      content,
    });
  }

  async delete({ id }: { id: string }): Promise<{ message: string }> {
    await this.getOne({ id });
    await this.notesEntity.delete({ id });

    return {
      message: 'delete note succses',
    };
  }
}
