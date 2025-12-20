import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/extension';
import { ConfigService } from '@nestjs/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(readonly configService: ConfigService) {
    const adapter = new PrismaMariaDb({
      host: configService.get('database.host'),
      port: configService.get('database.port'),
      user: configService.get('database.username'),
      password: configService.get('database.password'),
      database: configService.get('database.name'),
      connectionLimit: 5,
    });

    super({ adapter });
  }
}
