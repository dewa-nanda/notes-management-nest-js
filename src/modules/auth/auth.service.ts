import { Injectable } from '@nestjs/common';
import { CreateUserData, ResponseUserData } from './interfaces/auth.interface';
import { UserRepository } from './repository/user.repository';
import { hashPassword } from '@src/common/helpers/helpers';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async registerAccount(request: CreateUserData): Promise<ResponseUserData> {
    const { username, fullName, password, email } = request;

    return this.userRepository.createUser({
      username,
      fullName,
      email,
      password: await hashPassword(password),
    });
  }
}
