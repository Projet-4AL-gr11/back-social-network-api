import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RequestUser } from '../auth/interface/request-user.interface';
import { FriendshipService } from './friendship.service';
import { FriendshipRequestDto } from './domain/dto/friendship-request.dto';
import { FriendshipDto } from './domain/dto/friendship.dto';
import JwtRefreshGuard from '../auth/guards/jwt-refresh-token.guard';

@Controller('friendship')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @UseGuards(JwtRefreshGuard)
  @Get('sent-friendship-request')
  sentFriendshipRequest(@Req() request: RequestUser) {
    return this.friendshipService.sentFriendshipRequest(
      new FriendshipRequestDto(request.user.id),
    );
  }

  @UseGuards(JwtRefreshGuard)
  @Get('received-friendship-request')
  receivedFriendshipRequest(@Req() request: RequestUser) {
    return this.friendshipService.receivedFriendshipRequest(
      new FriendshipRequestDto(request.user.id),
    );
  }

  @UseGuards(JwtRefreshGuard)
  @Get(':id/friendship-status')
  statusFriendship(@Req() request: RequestUser, @Param('id') userId: string) {
    return this.friendshipService.statusFriendship(
      new FriendshipDto(request.user.id, userId),
    );
  }

  @UseGuards(JwtRefreshGuard)
  @Get('researchFriends/:name')
  researchFriends(@Req() request: RequestUser, @Param('name') name: string) {
    const { user } = request;
    return this.friendshipService.researchFriends(user.id, name);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('sendFriendshipRequest/:id')
  sendFriendshipRequest(
    @Req() request: RequestUser,
    @Param('id') userId: string,
  ) {
    return this.friendshipService.sendFriendshipRequest(
      new FriendshipDto(request.user.id, userId),
    );
  }

  @UseGuards(JwtRefreshGuard)
  @Put('acceptFriendshipRequest/:id')
  acceptFriendshipRequest(
    @Req() request: RequestUser,
    @Param('id') userId: string,
  ) {
    return this.friendshipService.acceptFriendshipRequest(
      new FriendshipDto(request.user.id, userId),
    );
  }

  @UseGuards(JwtRefreshGuard)
  @Delete(':id/cancel')
  cancelFriendshipRequest(
    @Req() request: RequestUser,
    @Param('id') userId: string,
  ) {
    return this.friendshipService.cancelFriendshipRequest(
      new FriendshipDto( userId, request.user.id),
    );
  }

  @UseGuards(JwtRefreshGuard)
  @Delete('cancel/friendship/:id')
  cancelMyFriendshipRequest(
    @Req() request: RequestUser,
    @Param('id') userId: string,
  ) {
    return this.friendshipService.cancelFriendshipRequest(
      new FriendshipDto( request.user.id,  userId,),
    );
  }

  @UseGuards(JwtRefreshGuard)
  @Delete(':id/reject')
  rejectFriendshipRequest(
    @Req() request: RequestUser,
    @Param('id') userId: string,
  ) {
    return this.friendshipService.rejectFriendshipRequest(
      new FriendshipDto(request.user.id, userId),
    );
  }

  @UseGuards(JwtRefreshGuard)
  @Delete(':id/remove')
  removeFriendship(@Req() request: RequestUser, @Param('id') userId: string) {
    return this.friendshipService.removeFriendship(
      new FriendshipDto(request.user.id, userId),
    );
  }
}
