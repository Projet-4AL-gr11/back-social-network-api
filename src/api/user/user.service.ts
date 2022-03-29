import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUserQuery } from './cqrs/query/get-user.query';
import { UpdateUserDto } from './domain/dto/update-user.dto';
import { UpdateUserCommand } from './cqrs/command/update-user.command';
import { DeleteUserCommand } from './cqrs/command/delete-user.command';
import { Injectable } from '@nestjs/common';
import { GetUserIfRefreshTokenMatchesQuery } from './cqrs/query/get-user-if-refresh-token-matches.query';
import { RemoveRefreshTokenCommand } from './cqrs/command/remove-refresh-token.command';
import { SetCurrentRefreshTokenCommand } from './cqrs/command/set-current-refresh-token.command';
import { BlockUserCommand } from './cqrs/command/block-user.command';
import { IsBlockedUserQuery } from './cqrs/query/is-blocked-user.query';
import { HasBlockedUserQuery } from './cqrs/query/has-blocked-user.query';
import { UnblockUserCommand } from './cqrs/command/unblock-user.command';

@Injectable()
export class UserService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  findAll() {
    return this.queryBus.execute(new GetUserQuery());
  }

  findOne(id: string) {
    return this.queryBus.execute(new GetUserQuery(id));
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.commandBus.execute(new UpdateUserCommand(id, updateUserDto));
  }

  remove(id: string) {
    return this.commandBus.execute(new DeleteUserCommand(id));
  }

  getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
    return this.queryBus.execute(
      new GetUserIfRefreshTokenMatchesQuery(refreshToken, userId),
    );
  }

  removeRefreshToken(userId: string) {
    return this.commandBus.execute(new RemoveRefreshTokenCommand(userId));
  }

  setCurrentRefreshToken(token: string, userId: string) {
    return this.commandBus.execute(
      new SetCurrentRefreshTokenCommand(token, userId),
    );
  }

  blockUser(currentUserId: string, userId: string) {
    return this.commandBus.execute(new BlockUserCommand(currentUserId, userId));
  }

  unblockUser(currentUserId: string, userId: string) {
    return this.commandBus.execute(
      new UnblockUserCommand(currentUserId, userId),
    );
  }

  isBlocked(currentUserId: string, userId: string) {
    return this.queryBus.execute(new IsBlockedUserQuery(currentUserId, userId));
  }

  hasBlocked(currentUserId: string, userId: string) {
    return this.queryBus.execute(
      new HasBlockedUserQuery(currentUserId, userId),
    );
  }
}
