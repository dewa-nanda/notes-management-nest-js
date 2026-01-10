import { Injectable } from '@nestjs/common';
import { Notes } from '../types/note.interface';
import { PrismaService } from '@src/database/prisma.service';

@Injectable()
export class NotesRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Notes[]> {
    return await this.prisma.client.note.findMany();
  }
}
