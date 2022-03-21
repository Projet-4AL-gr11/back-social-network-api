import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Message from './domain/entities/message.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { MessageService } from './message.service';
import { SaveMessageHandler } from './cqrs/handler/save-message.handler';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), CqrsModule],
  controllers: [],
  providers: [MessageService, AuthService, SaveMessageHandler],
})
export class MessageModule {}
