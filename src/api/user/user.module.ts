import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { GetUserHandler } from './cqrs/handler/query/get-user.handler';
import { DeleteUserHandler } from './cqrs/handler/command/delete-user.handler';
import { UpdateUserHandler } from './cqrs/handler/command/update-user.handler';
import { User } from './domain/entities/user.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { GetUserIfRefreshTokenMatchesHandler } from './cqrs/handler/query/get-user-if-refresh-token-matches.handler';
import { RemoveRefreshTokenHandler } from './cqrs/handler/command/remove-refresh-token.handler';
import { SetCurrentRefreshTokenHandler } from './cqrs/handler/command/set-current-refresh-token.handler';
import { UserService } from './user.service';
import { GetUserLoginHandler } from './cqrs/handler/query/get-user-login.handler';
import { BlockUserHandler } from './cqrs/handler/command/block-user.handler';
import { UnblockUserHandler } from './cqrs/handler/command/unblock-user.handler';
import { HasBlockedUserHandler } from './cqrs/handler/query/has-blocked-user.handler';
import { IsBlockedUserHandler } from './cqrs/handler/query/is-blocked-user.handler';
import { GetUserFriendsHandler } from './cqrs/handler/query/get-user-friends.handler';
import { ResearchUsernameHandler } from './cqrs/handler/query/research-username.handler';
import { GetConnectedUserQuery } from '../message/cqrs/query/get-connected-user.query';
import { ConnectedUser } from '../message/domain/entities/connected-user.entity';
import { GetConnectedUserHandler } from "../message/cqrs/handler/query/get-connected-user.handler";

@Module({
  imports: [TypeOrmModule.forFeature([User, ConnectedUser]), CqrsModule],
  controllers: [UserController],
  providers: [
    UserService,
    DeleteUserHandler,
    GetUserHandler,
    UpdateUserHandler,
    GetUserIfRefreshTokenMatchesHandler,
    RemoveRefreshTokenHandler,
    SetCurrentRefreshTokenHandler,
    GetUserLoginHandler,
    BlockUserHandler,
    UnblockUserHandler,
    HasBlockedUserHandler,
    IsBlockedUserHandler,
    GetUserFriendsHandler,
    ResearchUsernameHandler,
  ],
})
export class UserModule {}
