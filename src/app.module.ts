import { Module } from '@nestjs/common';
import { NotesModule } from './modules/notes/notes.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import appConfig from './config/app.config';
import { APP_FILTER } from '@nestjs/core';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';

@Module({
  imports: [
    NotesModule,
    ConfigModule.forRoot({
      envFilePath: '.env/.app.env',
      load: [appConfig],
    }),
    AuthModule,
    UsersModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
    },
  ],
})
export class AppModule {}
