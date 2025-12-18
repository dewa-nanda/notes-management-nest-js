import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

type RelationalDB = 'mysql' | 'postgres' | 'mariadb';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: configService.getOrThrow<RelationalDB>('database.type'),
        host: configService.getOrThrow<string>('database.host'),
        port: configService.getOrThrow<number>('database.port'),
        username: configService.getOrThrow<string>('database.username'),
        password: configService.getOrThrow<string>('database.password'),
        database: configService.getOrThrow<string>('database.name'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: configService.getOrThrow<boolean>('database.synchronize'),
      });

      return dataSource.initialize();
    },
  },
];
