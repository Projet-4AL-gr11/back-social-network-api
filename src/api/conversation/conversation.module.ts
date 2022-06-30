import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/domain/entities/user.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { ConversationService } from './conversation.service';
import { GetMembersFriendOneHandler } from './cqrs/handler/query/get-members-friend-one.handler';
import { GetMembersFriendTwoHandler } from './cqrs/handler/query/get-members-friend-two.handler';
import { GetConversationByIdHandler } from './cqrs/handler/query/get-conversation-by-id.handler';
import { ConversationController } from './conversation.controller';
import { Conversation } from './domain/entities/conversation.entity';
import { Friendship } from '../friendship/domain/entities/friendship.entity';
import { Group } from '../group/domain/entities/group.entity';
import { GetConversationsWithUserIdHandler } from './cqrs/handler/query/get-conversations-with-user-id.handler';
import { CreateConversationHandler } from './cqrs/handler/command/create-conversation.handler';
import { JoinedConversation } from '../message/domain/entities/joined-conversation.entity';
import { CreateConversationEventHandler } from './cqrs/event-handler/create-conversation.event-handler';
import { ErrorEventHandler } from "../../util/error/error.event-handler";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Conversation,
      User,
      Group,
      Friendship,
      JoinedConversation,
    ]),
    CqrsModule,
  ],
  controllers: [ConversationController],
  providers: [
    ConversationService,
    GetConversationByIdHandler,
    GetMembersFriendOneHandler,
    GetMembersFriendTwoHandler,
    GetConversationsWithUserIdHandler,
    CreateConversationHandler,
    CreateConversationEventHandler,
    ErrorEventHandler
  ],
})
export class ConversationModule {}
