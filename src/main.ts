import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get<number>('app.port') ?? 3000;
  const apiBaseUrl = configService.get<string>('app.baseUrl');

  const applicationName = configService.get<string>('app.name') as string;
  const applicationDescription = configService.get<string>(
    'app.description',
  ) as string;
  const applicationVersion = configService.get<string>('app.version') as string;

  const config = new DocumentBuilder()
    .setTitle(applicationName)
    .setDescription(applicationDescription)
    .setVersion(applicationVersion)
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  app.useGlobalFilters(new PrismaExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  SwaggerModule.setup('docs', app, documentFactory);
  await app.listen(port);

  console.log(`[ ${applicationName} ]`);
  console.log(apiBaseUrl);
}
bootstrap();
