import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createAuthDto: CreateUserDto) {
    const register = await this.authService.registerAccount(createAuthDto);

    return register;
  }
}
