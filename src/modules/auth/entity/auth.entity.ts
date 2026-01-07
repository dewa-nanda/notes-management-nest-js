import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '@src/database/prisma.service';
import { RegisterAccountRequest } from '../types/interfaces/auth.interface';

@Injectable()
export class AuthEntity {
  constructor(private prisma: PrismaService) {}

  async createUser(request: RegisterAccountRequest): Promise<User> {
    const response = await this.prisma.client.user.create({
      data: {
        email: request.email,
        password: request.password,
        username: request.username,
        fullName: request.fullName,
      },
    });

    return response;
  }
}
