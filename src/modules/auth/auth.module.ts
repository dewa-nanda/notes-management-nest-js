import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from './repository/user.repository';
import { DatabaseModule } from '@src/database/database.module';

@Module({
  providers: [AuthService, UserRepository],
  controllers: [AuthController],
  imports: [DatabaseModule],
})
export class AuthModule {}
