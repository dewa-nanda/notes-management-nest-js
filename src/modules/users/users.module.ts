import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '@src/database/database.module';
import { UsersEntity } from './entity/users.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersEntity],
  imports: [DatabaseModule],
})
export class UsersModule {}
