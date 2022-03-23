import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Message from './domain/entities/message.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { MessageService } from './message.service';
import { SaveMessageHandler } from './cqrs/handler/save-message.handler';
import { AuthService } from '../auth/auth.service';
import { MessageController } from './message.controller';
import { MessageGateway } from './gateway/message.gateway';
import { FindMessageHandler } from './cqrs/handler/find-message.handler';
import { SaveMessageEventHandler } from './cqrs/event-handler/save-message.event-handler';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from "../auth/strategy/jwt.strategy";
import { JwtRefreshTokenStrategy } from "../auth/strategy/jwt-refresh-token.strategy";
import { config } from "dotenv";
config()

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRATION_TIME,
      },
    }),
    PassportModule,
    TypeOrmModule.forFeature([Message]),
    CqrsModule,
  ],
  controllers: [MessageController],
  providers: [
    MessageGateway,
    MessageService,

    AuthService,
    SaveMessageHandler,
    FindMessageHandler,
    SaveMessageEventHandler,
  ],
  exports: [MessageService]
})
export class MessageModule {}
