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
import { GroupService } from './group.service';
import { GroupDto } from './domain/dto/group.dto';
import { RequestUser } from '../auth/interface/request-user.interface';

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
  findGroupWithUserId(@Param('id') id: string) {
    return this.groupService.getGroupWithUserId(id);
  }

  @Get('followers/:id')
  getFollowers(@Param('id') groupId: string) {
    return this.groupService.getFollowers(groupId);
  }

  @Post()
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
  update(@Param('id') id: string, @Body() groupDto: GroupDto) {
    return this.groupService.update(id, groupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.delete(id);
  }

  @Delete('removeUser/:id')
  removeUser(@Param('id') groupId: string, @Body() userId: string) {
    return this.groupService.removeUser(groupId, userId);
  }
}
