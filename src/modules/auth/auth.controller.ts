import { Body, Controller, Post } from '@nestjs/common';
import { CreateAuthDto } from './types/dtos/create-auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createAuthDto: CreateAuthDto) {
    const register = await this.authService.registerAccount(createAuthDto);

    return register;
  }
}
