import { Injectable } from '@nestjs/common';
import { Notes } from '../types/note.interface';
import { PrismaService } from '@src/database/prisma.service';

@Injectable()
export class NotesEntity {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Notes[]> {
    return await this.prisma.notes.findMany();
  }
}
