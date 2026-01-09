import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from './repositories/user.repository';
import { DatabaseModule } from '@src/database/database.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [DatabaseModule, PassportModule],
  providers: [AuthService, UserRepository, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
