import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/domain/entities/user.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { Friendship } from './domain/entities/friendship.entity';
import { FriendshipRequest } from './domain/entities/friendship-request.entity';
import { AcceptFriendshipRequestHandler } from './cqrs/handler/accept-friendship-request.handler';
import { CancelFriendshipRequestHandler } from './cqrs/handler/cancel-friendship-request.handler';
import { RemoveFriendshipHandler } from './cqrs/handler/remove-friendship.handler';
import { SendFriendshipRequestHandler } from './cqrs/handler/send-friendship-request.handler';
import { GetStatusFriendshipQuery } from './cqrs/query/get-status-friendship.query';
import { GetReceivedFriendshipRequestQuery } from './cqrs/query/get-received-friendship-request.query';
import { GetSentFriendshipRequestQuery } from './cqrs/query/get-sent-friendship-request.query';
import { FriendshipController } from './friendship.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Friendship, FriendshipRequest]),
    CqrsModule,
  ],
  controllers: [FriendshipController],
  providers: [
    AcceptFriendshipRequestHandler,
    CancelFriendshipRequestHandler,
    RemoveFriendshipHandler,
    SendFriendshipRequestHandler,
    GetStatusFriendshipQuery,
    GetReceivedFriendshipRequestQuery,
    GetSentFriendshipRequestQuery,
  ],
})
export class FriendshipModule {}
