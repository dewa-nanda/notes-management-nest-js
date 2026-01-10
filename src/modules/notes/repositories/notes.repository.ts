import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/database/prisma.service';
import {
  NoteCreateRequest,
  NoteFilterRequest,
  NoteResponse,
  NoteUpdateRequest,
} from '../interfaces/note.interface';
import { Note } from '@prisma/client';

@Injectable()
export class NotesRepository {
  constructor(private prisma: PrismaService) {}

  async findAll({ userId }: NoteFilterRequest = {}): Promise<NoteResponse[]> {
    return await this.prisma.client.note.findMany({
      where: { userId },
      omit: { userId: true },
    });
  }

  async findOne({ id }: { id: string }): Promise<Note | null> {
    return await this.prisma.client.note.findUnique({
      where: { id },
    });
  }

  async create({ title, content, userId }: NoteCreateRequest) {
    return this.prisma.client.note.create({
      data: {
        title,
        content,
        userId,
      },
    });
  }

  async update({ id, title, content }: NoteUpdateRequest) {
    return this.prisma.client.note.update({
      where: {
        id,
      },
      data: {
        content,
        title,
      },
    });
  }

  async delete({ id }: { id: string }) {
    return this.prisma.client.note.delete({
      where: {
        id,
      },
    });
  }
}
