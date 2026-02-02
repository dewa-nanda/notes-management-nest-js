import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return await this.prisma.client.user.findMany();
  }

  async findById({ id }: { id: string }) {
    return await this.prisma.client.user.findUniqueOrThrow({
      where: { id },
    });
  }
}
