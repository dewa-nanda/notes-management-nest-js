import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import {
  CurrentUser,
  type CurrentUserPayload,
} from '@src/common/decorators/current-user.decorator';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { type NoteAllQueryRequest } from './interfaces/note.interface';

@ApiBearerAuth()
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  async getAll(
    @Query() { page, limit }: NoteAllQueryRequest,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return this.notesService.getAll({
      userId: user.id,
      page,
      limit,
    });
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return this.notesService.getOne({ id });
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
  async update(@Param('id') id: string, @Body() dto: UpdateNoteDto) {
    return this.notesService.update({
      id,
      title: dto.title,
      content: dto.content,
    });
  }

  @Delete('/:id')
  async deleteOne(@Param('id') id: string) {
    return this.notesService.delete({ id });
  }
}
