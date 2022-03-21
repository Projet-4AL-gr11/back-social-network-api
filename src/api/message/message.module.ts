import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Message from './domain/entities/message.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { MessageService } from './message.service';
import { SaveMessageHandler } from './cqrs/handler/save-message.handler';
import { AuthService } from '../auth/auth.service';
import { MessageController } from './message.controller';
import { MessageGateway } from "./gateway/message.gateway";

@Module({
  imports: [TypeOrmModule.forFeature([Message]), CqrsModule],
  controllers: [MessageController],
  providers: [MessageGateway, MessageService, AuthService, SaveMessageHandler],
})
export class MessageModule {}
