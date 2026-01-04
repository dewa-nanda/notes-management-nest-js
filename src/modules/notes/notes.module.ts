import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { NotesEntity } from './entity/notes.entity';
import { DatabaseModule } from '@src/database/database.module';

@Module({
  controllers: [NotesController],
  providers: [NotesService, NotesEntity],
  imports: [DatabaseModule],
})
export class NotesModule {}
