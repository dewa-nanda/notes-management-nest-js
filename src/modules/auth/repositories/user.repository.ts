import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/database/prisma.service';
import { CreateUserInput, UserResponse } from '../interfaces/auth.interface';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(request: CreateUserInput): Promise<UserResponse> {
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

  async findByUsername(request: string): Promise<User> {
    return this.prisma.client.user.findUniqueOrThrow({
      where: { username: request },
    });
  }
}
