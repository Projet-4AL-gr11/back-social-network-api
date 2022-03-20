import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
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
import JwtAuthenticationGuard from '../auth/guards/jwt-auth.guard';
import { FriendshipService } from './friendship.service';
import { FriendshipRequestDto } from "./domain/dto/friendship-request.dto";
import { FriendshipDto } from "./domain/dto/friendship.dto";

@Controller('friendship')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get('sent-friendship-request')
  sentFriendshipRequest(@Req() request: RequestUser) {
    return this.friendshipService.sentFriendshipRequest(
      new FriendshipRequestDto(request.user.id),
    );
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('received-friendship-request')
  receivedFriendshipRequest(@Req() request: RequestUser) {
    return this.friendshipService.receivedFriendshipRequest(
      new FriendshipRequestDto(request.user.id),
    );
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':id/friendship-status')
  statusFriendship(@Req() request: RequestUser, @Param('id') userId: string) {
    return this.friendshipService.statusFriendship(
      new FriendshipDto(request.user.id, userId),
    );
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post(':id')
  sendFriendshipRequest(
    @Req() request: RequestUser,
    @Param('id') userId: string,
  ) {
    return this.friendshipService.sendFriendshipRequest(
      new FriendshipDto(request.user.id, userId),
    );
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put(':id')
  acceptFriendshipRequest(
    @Req() request: RequestUser,
    @Param('id') userId: string,
  ) {
    return this.friendshipService.acceptFriendshipRequest(
      new FriendshipDto(request.user.id, userId),
    );
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(':id/cancel')
  cancelFriendshipRequest(
    @Req() request: RequestUser,
    @Param('id') userId: string,
  ) {
    return this.friendshipService.cancelFriendshipRequest(
      new FriendshipDto(request.user.id, userId),
    );
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(':id/reject')
  rejectFriendshipRequest(
    @Req() request: RequestUser,
    @Param('id') userId: string,
  ) {
    return this.friendshipService.rejectFriendshipRequest(
      new FriendshipDto(request.user.id, userId),
    );
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(':id/remove')
  removeFriendship(@Req() request: RequestUser, @Param('id') userId: string) {
    return this.friendshipService.removeFriendship(
      new FriendshipDto(request.user.id, userId),
    );
  }
}
