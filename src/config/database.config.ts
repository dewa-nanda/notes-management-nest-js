import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: process.env.TYPE ?? 'mysql',
  host: process.env.HOST ?? 'localhost',
  port: Number(process.env.PORT ?? 3306),
  username: process.env.USERNAME ?? 'root',
  password: process.env.PASSWORD,
  name: process.env.DATABASE_NAME,
}));
