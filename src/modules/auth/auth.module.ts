import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthEntity } from './entity/auth.entity';
import { DatabaseModule } from '@src/database/database.module';

@Module({
  providers: [AuthService, AuthEntity],
  controllers: [AuthController],
  imports: [DatabaseModule],
})
export class AuthModule {}
