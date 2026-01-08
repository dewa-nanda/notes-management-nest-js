import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

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
    const user = await this.userRepository.findByUsername(request.username);

    if (!user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordMatch = await verifyPassword(
      request.password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const sanitizedUser = excludeFields(user, ['password']);
    const expiresIn = 3600;

    return {
      user: sanitizedUser,
      token: '',
      expiresIn,
    };
  }
}
