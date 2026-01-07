import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get<number>('app.port') ?? 3000;
  const aplicationName = configService.get<string>('app.name');
  const apiBaseUrl = configService.get<string>('app.baseUrl');

  app.useGlobalFilters(new PrismaExceptionFilter());
  await app.listen(port);

  console.log(`[ ${aplicationName} ]`);
  console.log(apiBaseUrl);
}
bootstrap();
