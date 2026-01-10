import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import {
  CurrentUser,
  type CurrentUserPayload,
} from '@src/common/decorators/current-user.decorator';
import { type NoteParams, NoteResponse } from './interfaces/note.interface';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from '@prisma/client';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  async getAll(
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<NoteResponse[]> {
    return this.notesService.getAll({ userId: user.id });
  }

  @Get('/:id')
  async getOne(@Param() params: NoteParams): Promise<Note> {
    return this.notesService.getOne({ id: params.id });
  }

  @Post()
  async create(
    @Body() dto: CreateNoteDto,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return this.notesService.create({
      title: dto.title,
      content: dto.content,
      userId: user.id,
    });
  }

  @Patch('/:id')
  async update(@Param() params: NoteParams, @Body() dto: UpdateNoteDto) {
    return this.notesService.update({
      id: params.id,
      title: dto.title,
      content: dto.content,
    });
  }

  @Delete('/:id')
  async deleteOne(@Param() params: NoteParams) {
    return this.notesService.delete({ id: params.id });
  }
}
