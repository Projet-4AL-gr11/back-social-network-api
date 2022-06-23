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
import { User } from './domain/entities/user.entity';
import { GetUserFriendsQuery } from './cqrs/query/get-user-friends.query';
import { ResearchUsernameQuery } from './cqrs/query/research-username.query';
import { GetConnectedUserQuery } from '../message/cqrs/query/get-connected-user.query';

@Injectable()
export class UserService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  async findAll() {
    return this.queryBus.execute(new GetUserQuery());
  }

  async findOne(id: string) {
    return this.queryBus.execute(new GetUserQuery(id));
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.commandBus.execute(new UpdateUserCommand(id, updateUserDto));
  }

  async remove(id: string) {
    return this.commandBus.execute(new DeleteUserCommand(id));
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
    return this.queryBus.execute(
      new GetUserIfRefreshTokenMatchesQuery(refreshToken, userId),
    );
  }

  async removeRefreshToken(userId: string) {
    return this.commandBus.execute(new RemoveRefreshTokenCommand(userId));
  }

  async setCurrentRefreshToken(token: string, userId: string) {
    return this.commandBus.execute(
      new SetCurrentRefreshTokenCommand(token, userId),
    );
  }

  async blockUser(currentUserId: string, userId: string) {
    return this.commandBus.execute(new BlockUserCommand(currentUserId, userId));
  }

  async unblockUser(currentUserId: string, userId: string) {
    return this.commandBus.execute(
      new UnblockUserCommand(currentUserId, userId),
    );
  }

  async isBlocked(currentUserId: string, userId: string) {
    return this.queryBus.execute(new IsBlockedUserQuery(currentUserId, userId));
  }

  async hasBlocked(currentUserId: string, userId: string) {
    return this.queryBus.execute(
      new HasBlockedUserQuery(currentUserId, userId),
    );
  }

  async getFriendship(id: string): Promise<User[]> {
    return (await this.getFriendOne(id)).concat(await this.getFriendTwo(id));
  }

  async getFriendOne(id: string): Promise<User[]> {
    return this.queryBus.execute(new GetUserFriendsQuery(id, true));
  }

  async getFriendTwo(id: string): Promise<User[]> {
    return this.queryBus.execute(new GetUserFriendsQuery(id, false));
  }

  researchUsername(id: string, name: string) {
    return this.queryBus.execute(new ResearchUsernameQuery(id, name));
  }

}
