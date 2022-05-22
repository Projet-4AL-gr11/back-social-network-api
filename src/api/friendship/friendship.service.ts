import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { SendFriendshipRequestCommand } from './cqrs/command/send-friendship-request.command';
import { AcceptFriendshipRequestCommand } from './cqrs/command/accept-friendship-request.command';
import { CancelFriendshipRequestCommand } from './cqrs/command/cancel-friendship-request.command';
import { RemoveFriendshipCommand } from './cqrs/command/remove-friendship.command';
import { GetSentFriendshipRequestQuery } from './cqrs/query/get-sent-friendship-request.query';
import { GetReceivedFriendshipRequestQuery } from './cqrs/query/get-received-friendship-request.query';
import { GetStatusFriendshipQuery } from './cqrs/query/get-status-friendship.query';
import { FriendshipDto } from './domain/dto/friendship.dto';
import { FriendshipRequestDto } from './domain/dto/friendship-request.dto';
import { GetUserQuery } from '../user/cqrs/query/get-user.query';

@Injectable()
export class FriendshipService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  async sentFriendshipRequest(queryArs: FriendshipRequestDto) {
    return this.queryBus.execute(
      new GetSentFriendshipRequestQuery(queryArs.userId),
    );
  }

  async receivedFriendshipRequest(queryArs: FriendshipRequestDto) {
    return this.queryBus.execute(
      new GetReceivedFriendshipRequestQuery(queryArs.userId),
    );
  }

  async statusFriendship(queryArs: FriendshipDto) {
    return this.queryBus.execute(
      new GetStatusFriendshipQuery(queryArs.senderId, queryArs.userId),
    );
  }

  async sendFriendshipRequest(commandArgs: FriendshipDto) {
    const sender = await this.queryBus.execute(
      new GetUserQuery(commandArgs.senderId),
    );
    const user = await this.queryBus.execute(
      new GetUserQuery(commandArgs.userId),
    );
    return this.commandBus.execute(
      new SendFriendshipRequestCommand(sender, user),
    );
  }

  async acceptFriendshipRequest(commandArgs: FriendshipDto) {
    const friendOne = await this.queryBus.execute(
      new GetUserQuery(commandArgs.senderId),
    );
    const friendTwo = await this.queryBus.execute(
      new GetUserQuery(commandArgs.userId),
    );
    await this.commandBus.execute(
      new CancelFriendshipRequestCommand(
        commandArgs.userId,
        commandArgs.senderId,
      ),
    );
    return await this.commandBus.execute(
      new AcceptFriendshipRequestCommand(friendOne, friendTwo),
    );
  }

  async cancelFriendshipRequest(commandArgs: FriendshipDto) {
    return this.commandBus.execute(
      new CancelFriendshipRequestCommand(
        commandArgs.senderId,
        commandArgs.userId,
      ),
    );
  }

  async rejectFriendshipRequest(commandArgs: FriendshipDto) {
    return this.commandBus.execute(
      new CancelFriendshipRequestCommand(
        commandArgs.userId,
        commandArgs.senderId,
      ),
    );
  }

  async removeFriendship(commandArgs: FriendshipDto) {
    return this.commandBus.execute(
      new RemoveFriendshipCommand(commandArgs.senderId, commandArgs.userId),
    );
  }
}
