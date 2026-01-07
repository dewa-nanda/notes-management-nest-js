import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '@src/database/prisma.service';

@Injectable()
export class UsersEntity {
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
