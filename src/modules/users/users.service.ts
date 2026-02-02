import { Injectable } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(readonly usersRepository: UsersRepository) {}

  async findAll() {
    return await this.usersRepository.findAll();
  }

  async findById({ id }: { id: string }) {
    return await this.usersRepository.findById({ id });
  }
}
