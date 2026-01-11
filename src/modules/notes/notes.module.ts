import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { NotesRepository } from './repositories/notes.repository';
import { DatabaseModule } from '@src/database/database.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../../common/guards/jwt-auth/jwt-auth.guard';

@Module({
  controllers: [NotesController],
  providers: [
    NotesService,
    NotesRepository,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  imports: [DatabaseModule],
})
export class NotesModule {}
