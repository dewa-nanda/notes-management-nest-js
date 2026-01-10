import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  CreateUserInput,
  LoginInput,
  LoginResponse,
  UserResponse,
} from './interfaces/auth.interface';
import { UserRepository } from './repositories/user.repository';
import {
  excludeFields,
  hashPassword,
  verifyPassword,
} from '@src/common/helpers/helpers';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserResponse> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException();
    }
    const isPasswordMatch = await verifyPassword(password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException();
    }

    const sanitizedUser = excludeFields(user, ['password']);

    return sanitizedUser;
  }

  async register(request: CreateUserInput): Promise<UserResponse> {
    const { username, fullName, password, email } = request;

    return this.userRepository.createUser({
      username,
      fullName,
      email,
      password: await hashPassword(password),
    });
  }

  async login(request: LoginInput): Promise<LoginResponse> {
    const user = await this.validateUser(request.username, request.password);
    const expiresIn = 3600;
    const token = this.jwtService.sign({
      username: user.username,
      id: user.id,
    });

    return {
      user: user,
      token,
      expiresIn,
    };
  }
}
