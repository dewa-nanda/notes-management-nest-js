import { Injectable } from '@nestjs/common';
import { UsersEntity } from './entity/users.entity';

@Injectable()
export class UsersService {
  constructor(readonly usersEntity: UsersEntity) {}

  async findAll() {
    return await this.usersEntity.findAll();
  }

  async findById({ id }: { id: string }) {
    return await this.usersEntity.findById({ id });
  }
}
