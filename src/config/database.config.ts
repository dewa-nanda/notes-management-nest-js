import { registerAs } from '@nestjs/config';
import { DatabaseType } from 'typeorm';

export default registerAs('database', () => ({
  type: (process.env.TYPE as DatabaseType) ?? ('mysql' as DatabaseType),
  host: process.env.HOST ?? 'localhost',
  port: Number(process.env.PORT ?? 3306),
  username: process.env.USERNAME ?? 'root',
  password: process.env.PASSWORD,
  name: process.env.DATABASE_NAME,
  synchronize: process.env.SYNCHRONIZE === 'true' ? true : false,
}));
