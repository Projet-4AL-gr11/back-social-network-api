import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Message from './domain/entities/message.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { MessageService } from './message.service';
import { SaveMessageHandler } from './cqrs/handler/command/save-message.handler';
import { AuthService } from '../auth/auth.service';
import { MessageController } from './message.controller';
import { MessageGateway } from './gateway/message.gateway';
import { FindMessageHandler } from './cqrs/handler/query/find-message.handler';
import { SaveMessageEventHandler } from './cqrs/event-handler/save-message.event-handler';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { config } from 'dotenv';
import { User } from '../user/domain/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { Conversation } from '../conversation/domain/entities/conversation.entity';
import { ConversationService } from '../conversation/conversation.service';
import { UserService } from '../user/user.service';
import { GetConnectedUserHandler } from './cqrs/handler/query/get-connected-user.handler';
import { ConnectedUser } from './domain/entities/connected-user.entity';
import { CreateConnectedUserHandler } from './cqrs/handler/command/create-connected-user.handler';
import { DeleteConnectedUserHandler } from './cqrs/handler/command/delete-connected-user.handler';
import { DeleteAllConnectedUserHandler } from './cqrs/handler/command/delete-all-connected-user.handler';
import { JoinedConversation } from './domain/entities/joined-conversation.entity';
import { DeleteAllJoinedConversationHandler } from './cqrs/handler/command/delete-all-joined-conversation.handler';
import { DeleteJoinedConversationBySocketIdHandler } from './cqrs/handler/command/delete-joined-conversation-by-socket-id.handler';
import { GetJoinedConversationByConversationIdHandler } from './cqrs/handler/query/get-joined-conversation-by-conversation-id.handler';
import { GetJoinedConversationByUserIdHandler } from './cqrs/handler/query/get-joined-conversation-by-user-id.handler';
import { CreateJoinedConversationHandler } from './cqrs/handler/command/create-joined-conversation.handler';
import { CreateMessageHandler } from './cqrs/handler/command/create-message.handler';
import { CreateConnectedUserEventHandler } from './cqrs/event-handler/create-connected-user.event-handler';
import { CreateJoinedConversationEventHandler } from './cqrs/event-handler/create-joined-conversation.event-handler';
import { DeleteAllConnectedUserEventHandler } from './cqrs/event-handler/delete-all-connected-user.event-handler';
import { DeleteAllJoinedConversationEventHandler } from './cqrs/event-handler/delete-all-joined-conversation.event-handler';
import { CreateMessageEventHandler } from './cqrs/event-handler/create-message.event-handler';
import { DeleteJoinedConversationBySocketIdEventHandler } from './cqrs/event-handler/delete-joined-conversation-by-socket-id.event-handler';
import { ErrorEventHandler } from "../../util/error/error.event-handler";

config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRATION_TIME,
      },
    }),
    PassportModule,
    TypeOrmModule.forFeature([
      Message,
      User,
      Conversation,
      ConnectedUser,
      JoinedConversation,
    ]),
    CqrsModule,
    AuthModule,
    UserModule,
  ],
  controllers: [MessageController],
  providers: [
    MessageGateway,
    MessageService,
    UserService,
    ConversationService,
    AuthService,
    SaveMessageHandler,
    FindMessageHandler,
    GetConnectedUserHandler,
    CreateConnectedUserHandler,
    DeleteConnectedUserHandler,
    DeleteAllConnectedUserHandler,
    DeleteAllJoinedConversationHandler,
    DeleteJoinedConversationBySocketIdHandler,
    GetJoinedConversationByConversationIdHandler,
    GetJoinedConversationByUserIdHandler,
    CreateJoinedConversationHandler,
    CreateMessageHandler,
    SaveMessageEventHandler,
    CreateConnectedUserEventHandler,
    CreateJoinedConversationEventHandler,
    DeleteAllConnectedUserEventHandler,
    DeleteAllJoinedConversationEventHandler,
    DeleteJoinedConversationBySocketIdEventHandler,
    CreateMessageEventHandler,
    ErrorEventHandler,
  ],
  exports: [MessageService],
})
export class MessageModule {}
