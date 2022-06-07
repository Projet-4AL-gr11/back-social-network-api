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

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}
  // TODO: Ajouter les UseGuards

  @Get()
  findAll() {
    return this.groupService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.getById(id);
  }

  @Get('userId/:id')
  findGroupsWithUserId(@Param('id') id: string) {
    return this.groupService.getGroupWithUserId(id);
  }

  @Get('followers/:id')
  getFollowers(@Param('id') groupId: string) {
    return this.groupService.getFollowers(groupId);
  }

  @Get('whereAdmin/:id')
  getGroupsWhereUserIsAdmin(@Param('id') userId: string) {
    return this.groupService.getWhereUserIsAdmin(userId);
  }

  @Post()
  @UseGuards(JwtRefreshGuard)
  createGroup(@Req() request: RequestUser, @Body() groupDto: GroupDto) {
    const { user } = request;
    return this.groupService.create(user.id, groupDto);
  }

  @Post('addFollower/:groupId')
  addGroupFollower(
    @Req() request: RequestUser,
    @Param('groupId') groupId: string,
  ) {
    const { user } = request;
    return this.groupService.addFollower(user.id, groupId);
  }

  @Post('removeFollower/:groupId')
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
      this.groupService.isUserOwner(id, user.id)
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

  @Put('removeUser/:id')
  @UseGuards(JwtRefreshGuard)
  removeUser(
    @Req() request: RequestUser,
    @Param('id') groupId: string,
    @Body() userId: string,
  ) {
    const { user } = request;
    if (
      this.groupService.isUserOwner(groupId, user.id) ||
      this.groupService.isUserAdmin(groupId, user.id) ||
      user.id === userId
    ) {
      return this.groupService.removeUser(groupId, userId);
    }
    return new Error(
      "you don't have permission to remove this person from this group",
    );
  }

  @Get('isUserOwner/:groupId')
  isUserOwner(@Param('id') groupId: string, @Body() userId: string) {
    return this.groupService.isUserOwner(groupId, userId);
  }

  @Get('isUserAdmin/:groupId')
  isUserAdmin(@Param('id') groupId: string, @Body() userId: string) {
    return this.groupService.isUserAdmin(groupId, userId);
  }

  @Post('giveAdminRight/:groupId')
  @UseGuards(JwtRefreshGuard)
  giveAdminRight(
    @Req() request: RequestUser,
    @Param('id') groupId: string,
    @Body() userId: string,
  ) {
    const { user } = request;
    if (
      this.groupService.isUserOwner(groupId, user.id) ||
      this.groupService.isUserAdmin(groupId, user.id)
    ) {
      return this.groupService.giveAdminRight(groupId, userId);
    }
    return new Error(
      "you don't have permission to give admin right to this person in this group",
    );
  }

  @Put('removeAdminRight/:groupId')
  @UseGuards(JwtRefreshGuard)
  removeAdminRight(
    @Req() request: RequestUser,
    @Param('id') groupId: string,
    @Body() userId: string,
  ) {
    const { user } = request;
    if (
      this.groupService.isUserOwner(groupId, user.id) ||
      this.groupService.isUserAdmin(groupId, user.id)
    ) {
      return this.groupService.removeAdminRight(groupId, userId);
    }
    return new Error(
      "you don't have permission to remove admin right to this person in this group",
    );
  }
}
