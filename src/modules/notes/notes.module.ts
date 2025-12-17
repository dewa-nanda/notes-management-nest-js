import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { NotesEntity } from './entity/notes.entity';

@Module({
  controllers: [NotesController],
  providers: [NotesService, NotesEntity],
})
export class NotesModule {}
