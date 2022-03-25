import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './domain/entities/conversation.entity';
import { User } from '../user/domain/entities/user.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { ConversationService } from './conversation.service';
import { GetMembersFriendOneHandler } from './cqrs/handler/query/get-members-friend-one.handler';
import { GetMembersFriendTwoHandler } from './cqrs/handler/query/get-members-friend-two.handler';
import { GetConversationByIdHandler } from './cqrs/handler/query/get-conversation-by-id.handler';
import { ConversationController } from './conversation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation, User]), CqrsModule],
  controllers: [ConversationController],
  providers: [
    ConversationService,
    GetConversationByIdHandler,
    GetMembersFriendOneHandler,
    GetMembersFriendTwoHandler,
  ],
})
export class ConversationModule {}
