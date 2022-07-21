import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { join } from 'path';

export class DatabaseConfiguration implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT, 10) || 5432,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      // ssl: true,
      // extra: {
      //   "ssl": {
      //     "rejectUnauthorized": false
      //   }
      // },

      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      logging: process.env.TYPEORM_LOGGING,
      synchronize: process.env.TYPEORM_SYNCHRONIZE,
    };
  }
}


/*
"ssl": true,
  "extra": {
    "ssl": {
      "rejectUnauthorized": false
    }
  }
 */