import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: process.env.APP_NAME ?? 'nestjs-app',
  description: process.env.APP_DESCRIPTION ?? 'lorem ipsum',
  version: process.env.APP_VERSION ?? '1.0',
  env: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.APP_PORT ?? 3000),
  baseUrl: process.env.APP_BASE_URL ?? 'http://localhost:3000',
  isProduction: process.env.NODE_ENV === 'production',
}));
