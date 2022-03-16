import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RequestUser } from '../auth/interface/request-user.interface';
import { GetSentFriendshipRequestQuery } from './cqrs/query/get-sent-friendship-request.query';
import { GetReceivedFriendshipRequestQuery } from './cqrs/query/get-received-friendship-request.query';
import { GetStatusFriendshipQuery } from './cqrs/query/get-status-friendship.query';
import { SendFriendshipRequestCommand } from './cqrs/command/send-friendship-request.command';
import { AcceptFriendshipRequestCommand } from './cqrs/command/accept-friendship-request.command';
import { CancelFriendshipRequestCommand } from './cqrs/command/cancel-friendship-request.command';
import { RemoveFriendshipCommand } from './cqrs/command/remove-friendship.command';

@Controller('friendship')
export class FriendshipController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  @Get()
  sentFriendshipRequest(@Req() request: RequestUser) {
    this.queryBus.execute(new GetSentFriendshipRequestQuery(request.user.id));
  }

  @Get()
  receivedFriendshipRequest(@Req() request: RequestUser) {
    this.queryBus.execute(
      new GetReceivedFriendshipRequestQuery(request.user.id),
    );
  }

  @Get(':id/friendship-status')
  statusFriendship(@Req() request: RequestUser, @Param('id') userId: string) {
    this.queryBus.execute(new GetStatusFriendshipQuery(request.user, userId));
  }

  @Post(':id')
  sendFriendshipRequest(
    @Req() request: RequestUser,
    @Param('id') userId: string,
  ) {
    this.commandBus.execute(
      new SendFriendshipRequestCommand(request.user, userId),
    );
  }

  @Put(':id')
  acceptFriendshipRequest(
    @Req() request: RequestUser,
    @Param('id') userId: string,
  ) {
    this.commandBus.execute(
      new AcceptFriendshipRequestCommand(request.user, userId),
    );
  }

  @Delete(':id/cancel')
  cancelFriendshipRequest(
    @Req() request: RequestUser,
    @Param('id') userId: string,
  ) {
    this.commandBus.execute(
      new CancelFriendshipRequestCommand(request.user.id, userId),
    );
  }

  @Delete(':id/reject')
  rejectFriendshipRequest(
    @Req() request: RequestUser,
    @Param('id') userId: string,
  ) {
    this.commandBus.execute(
      new CancelFriendshipRequestCommand(userId, request.user.id),
    );
  }

  @Delete(':id/remove')
  removeFriendship(@Req() request: RequestUser, @Param('id') userId: string) {
    this.commandBus.execute(
      new RemoveFriendshipCommand(request.user.id, userId),
    );
  }
}
