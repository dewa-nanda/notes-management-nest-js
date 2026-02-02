import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import {
  NoteCreateRequest,
  NoteFilterRequest,
  NoteResponse,
  NoteUpdateRequest,
} from '../interfaces/note.interface';
import { Note } from '@prisma/client';
import { Meta, PaginatedData } from '@src/common/interfaces/api-response';

@Injectable()
export class NotesRepository {
  constructor(private prisma: PrismaService) {}

  async findAll({
    userId,
    page = 1,
    limit = 10,
  }: NoteFilterRequest): Promise<PaginatedData<NoteResponse>> {
    page = Number(page);
    limit = Number(limit);

    const skip = (page - 1) * limit;

    const [items, total] = await this.prisma.client.$transaction([
      this.prisma.client.note.findMany({
        where: { userId },
        omit: { userId: true },
        skip,
        take: limit,
      }),
      this.prisma.client.note.count({
        where: { userId },
      }),
    ]);

    const meta: Meta = {
      currentPage: page,
      perPage: limit,
      total,
      totalPages: Math.ceil(total / limit),
    };

    return { items, meta };
  }

  async findOne({ id }: { id: string }): Promise<Note | null> {
    return await this.prisma.client.note.findUnique({
      where: { id },
    });
  }

  async create({
    title,
    content,
    userId,
  }: NoteCreateRequest): Promise<NoteResponse> {
    return this.prisma.client.note.create({
      data: {
        title,
        content,
        userId,
      },
      omit: {
        userId: true,
      },
    });
  }

  async update({
    id,
    title,
    content,
  }: NoteUpdateRequest): Promise<NoteResponse> {
    return this.prisma.client.note.update({
      where: {
        id,
      },
      data: {
        content,
        title,
      },
      omit: {
        userId: true,
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
