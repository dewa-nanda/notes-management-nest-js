import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { NotesRepository } from './repositories/notes.repository';
import { PrismaModule } from '@src/prisma/prisma.module';
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
  imports: [PrismaModule],
})
export class NotesModule {}
