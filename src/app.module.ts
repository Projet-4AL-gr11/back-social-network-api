import { Logger, Module } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './api/user/domain/entities/user.entity';
import { Friendship } from './api/friendship/domain/entities/friendship.entity';
import { FriendshipRequest } from './api/friendship/domain/entities/friendship-request.entity';
import { FriendshipModule } from './api/friendship/friendship.module';

config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '172.17.0.2',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [User, Friendship, FriendshipRequest],
      synchronize: true,
      logging: false,
    }),
    UserModule,
    AuthModule,
    FriendshipModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
