import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/domain/entities/user.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { Friendship } from './domain/entities/friendship.entity';
import { FriendshipRequest } from './domain/entities/friendship-request.entity';
import { AcceptFriendshipRequestHandler } from './cqrs/handler/command/accept-friendship-request.handler';
import { CancelFriendshipRequestHandler } from './cqrs/handler/command/cancel-friendship-request.handler';
import { RemoveFriendshipHandler } from './cqrs/handler/command/remove-friendship.handler';
import { SendFriendshipRequestHandler } from './cqrs/handler/command/send-friendship-request.handler';
import { FriendshipController } from './friendship.controller';
import { GetStatusFriendshipHandler } from './cqrs/handler/query/get-status-friendship.handler';
import { GetReceivedFriendshipHandler } from './cqrs/handler/query/get-received-friendship.handler';
import { GetSentFriendshipRequestHandler } from './cqrs/handler/query/get-sent-friendship-request.handler';
import { AcceptFriendshipRequestEventHandler } from './cqrs/event-handler/accept-friendship-request.event-handler';
import { CancelFriendshipRequestEventHandler } from './cqrs/event-handler/cancel-friendship-request-event.handler';
import { RemoveFriendshipEventHandler } from './cqrs/event-handler/remove-friendship.event-handler';
import { SendFriendshipRequestEventHandler } from './cqrs/event-handler/send-friendship-request.event-handler';
import { FriendshipService } from './friendship.service';
import { ResearchFriendsHandler } from './cqrs/handler/query/research-friends.handler';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Friendship, FriendshipRequest]),
    CqrsModule,
  ],
  controllers: [FriendshipController],
  providers: [
    FriendshipService,
    AcceptFriendshipRequestHandler,
    AcceptFriendshipRequestEventHandler,
    CancelFriendshipRequestHandler,
    CancelFriendshipRequestEventHandler,
    RemoveFriendshipHandler,
    RemoveFriendshipEventHandler,
    SendFriendshipRequestHandler,
    SendFriendshipRequestEventHandler,
    GetStatusFriendshipHandler,
    GetReceivedFriendshipHandler,
    GetSentFriendshipRequestHandler,
    ResearchFriendsHandler,
  ],
})
export class FriendshipModule {}
