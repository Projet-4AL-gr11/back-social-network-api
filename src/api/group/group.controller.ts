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
import { GroupService } from './group.service';
import { GroupDto } from './domain/dto/group.dto';
import { RequestUser } from '../auth/interface/request-user.interface';
import JwtRefreshGuard from '../auth/guards/jwt-refresh-token.guard';
import { UserType } from '../user/domain/enum/user-type.enum';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  findAll() {
    return this.groupService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.getById(id);
  }

  @Get('groupRequest/currentUser')
  @UseGuards(JwtRefreshGuard)
  getGroupRequest(@Req() request: RequestUser) {
    const { user } = request;
    return this.groupService.getGroupRequestWithUserId(user.id);
  }

  @Get('userId/:id')
  findGroupsWithUserId(@Param('id') id: string) {
    return this.groupService.getGroupWithUserId(id);
  }

  @Get('followers/:id')
  async getFollowers(@Param('id') groupId: string) {
    return await this.groupService.getFollowers(groupId);
  }

  @Get('members/:id')
  async getMembers(@Param('id') groupId: string) {
    return await this.groupService.getMembers(groupId);
  }

  @Get('whereAdmin/:id')
  getGroupsWhereUserIsAdmin(@Param('id') userId: string) {
    return this.groupService.getWhereUserIsAdmin(userId);
  }

  @Get('groupRequest/whereAdmin')
  @UseGuards(JwtRefreshGuard)
  getGroupRequestWhereAdmin(@Req() request: RequestUser) {
    const { user } = request;
    return this.groupService.getGroupRequestWhereAdmin(user.id);
  }

  @Get('groupRequest/:groupId')
  @UseGuards(JwtRefreshGuard)
  GetGroupRequestWithGroupIdQuery(@Param('groupId') groupId: string) {
    return this.groupService.GetGroupRequestWithGroupIdQuery(groupId);
  }

  @Post()
  @UseGuards(JwtRefreshGuard)
  createGroup(@Req() request: RequestUser, @Body() groupDto: GroupDto) {
    const { user } = request;
    return this.groupService.create(user.id, groupDto);
  }

  @Post('addFollower/:groupId')
  @UseGuards(JwtRefreshGuard)
  addGroupFollower(
    @Req() request: RequestUser,
    @Param('groupId') groupId: string,
  ) {
    const { user } = request;
    return this.groupService.addFollower(user.id, groupId);
  }

  @Post('removeFollower/:groupId')
  @UseGuards(JwtRefreshGuard)
  removeGroupFollower(
    @Req() request: RequestUser,
    @Param('groupId') groupId: string,
  ) {
    const { user } = request;
    return this.groupService.removeFollower(user.id, groupId);
  }

  @Put(':id')
  @UseGuards(JwtRefreshGuard)
  update(
    @Req() request: RequestUser,
    @Param('id') id: string,
    @Body() groupDto: GroupDto,
  ) {
    const { user } = request;
    if (
      this.groupService.isUserAdmin(id, user.id) ||
      this.groupService.isUserOwner(id, user.id) ||
      user.userType == UserType.ADMIN
    ) {
      return this.groupService.update(id, groupDto);
    }
    return new Error("you don't have permission to update this group");
  }

  @Delete(':id')
  @UseGuards(JwtRefreshGuard)
  remove(@Req() request: RequestUser, @Param('id') id: string) {
    const { user } = request;
    if (this.groupService.isUserOwner(id, user.id)) {
      return this.groupService.delete(id);
    }
    return new Error("you don't have permission to delete this group");
  }

  @Put('removeUser/:id/:userId')
  @UseGuards(JwtRefreshGuard)
  removeUser(
    @Req() request: RequestUser,
    @Param('id') groupId: string,
    @Param('userId') userId: string,
  ) {
    const { user } = request;
    if (
      this.groupService.isUserOwner(groupId, user.id) ||
      this.groupService.isUserAdmin(groupId, user.id) ||
      user.id === userId ||
      user.userType == UserType.ADMIN
    ) {
      return this.groupService.removeUser(groupId, userId);
    }
    return new Error(
      "you don't have permission to remove this person from this group",
    );
  }

  @Put('leaveGroup/:id')
  @UseGuards(JwtRefreshGuard)
  leaveGroup(@Req() request: RequestUser, @Param('id') groupId: string) {
    const { user } = request;
    return this.groupService.removeUser(groupId, user.id);
  }

  @Get('isUserOwner/:groupId/:userId')
  isUserOwner(
    @Param('groupId') groupId: string,
    @Param('userId') userId: string,
  ) {
    return this.groupService.isUserOwner(groupId, userId);
  }

  @Get('isUserAdmin/:groupId/:userId')
  isUserAdmin(
    @Param('groupId') groupId: string,
    @Param('userId') userId: string,
  ) {
    return this.groupService.isUserAdmin(groupId, userId);
  }

  @Get('groupRequest/status/:groupId/:userId')
  getGroupRequestStatus(
    @Param('groupId') groupId: string,
    @Param('userId') userId: string,
  ) {
    return this.groupService.getGroupRequestStatus(userId, groupId);
  }

  @Put('giveAdminRight/:groupId/:userId')
  @UseGuards(JwtRefreshGuard)
  giveAdminRight(
    @Req() request: RequestUser,
    @Param('groupId') groupId: string,
    @Param('userId') userId: string,
  ) {
    const { user } = request;
    if (
      this.groupService.isUserOwner(groupId, user.id) ||
      this.groupService.isUserAdmin(groupId, user.id) ||
      user.userType == UserType.ADMIN
    ) {
      return this.groupService.giveAdminRight(groupId, userId);
    }
    return new Error(
      "you don't have permission to give admin right to this person in this group",
    );
  }

  @Put('removeAdminRight/:groupId/:userId')
  @UseGuards(JwtRefreshGuard)
  removeAdminRight(
    @Req() request: RequestUser,
    @Param('groupId') groupId: string,
    @Param('userId') userId: string,
  ) {
    const { user } = request;
    if (
      this.groupService.isUserOwner(groupId, user.id) ||
      this.groupService.isUserAdmin(groupId, user.id) ||
      user.userType == UserType.ADMIN
    ) {
      return this.groupService.removeAdminRight(groupId, userId);
    }
    return new Error(
      "you don't have permission to remove admin right to this person in this group",
    );
  }

  @Put('giveGroupOwnership/:groupId/:userId')
  @UseGuards(JwtRefreshGuard)
  giveGroupOwnership(
    @Req() request: RequestUser,
    @Param('groupId') groupId: string,
    @Param('userId') userId: string,
  ) {
    const { user } = request;
    if (this.groupService.isUserOwner(groupId, user.id) ||
      user.userType == UserType.ADMIN) {
      return this.groupService.giveGroupOwnership(groupId, user.id, userId);
    }
    return new Error(
      "you don't have permission to remove admin right to this person in this group",
    );
  }

  @Post('sendGroupRequest/:groupId')
  @UseGuards(JwtRefreshGuard)
  sendGroupRequest(
    @Req() request: RequestUser,
    @Param('groupId') groupId: string,
  ) {
    const { user } = request;
    return this.groupService.sendGroupRequest(groupId, user.id);
  }

  @Post('acceptGroupRequest/:groupId/:userId')
  @UseGuards(JwtRefreshGuard)
  acceptGroupRequest(
    @Param('userId') userId: string,
    @Param('groupId') groupId: string,
  ) {
    return this.groupService.acceptGroupRequest(groupId, userId);
  }

  @Post('cancelGroupRequest/:groupId')
  @UseGuards(JwtRefreshGuard)
  cancelGroupRequest(
    @Req() request: RequestUser,
    @Param('groupId') groupId: string,
  ) {
    const { user } = request;
    return this.groupService.cancelGroupRequest(groupId, user.id);
  }

  @Put('cancelGroupRequestAdmin/:groupId/:userId')
  @UseGuards(JwtRefreshGuard)
  async cancelGroupRequestAdmin(
    @Req() request: RequestUser,
    @Param('groupId') groupId: string,
    @Param('userId') userId: string,
  ) {
    const { user } = request;
    return await this.groupService
      .getWhereUserIsAdmin(userId)
      .then((groups) => {
        for (const group of groups) {
          if (group.id == groupId) {
            return this.groupService.cancelGroupRequest(groupId, userId);
          }
        }
        return Error('You are not admin for this group');
      });
  }
}
