import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/database/prisma.service';
import { CreateUserData, ResponseUserData } from '../interfaces/auth.interface';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(request: CreateUserData): Promise<ResponseUserData> {
    return this.prisma.client.user.create({
      data: {
        email: request.email,
        password: request.password,
        username: request.username,
        fullName: request.fullName,
      },
      select: {
        id: true,
        email: true,
        username: true,
        fullName: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
