import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { GroupService } from './group.service';
import JwtAuthenticationGuard from '../auth/guards/jwt-auth.guard';
import { GroupDto } from './domain/dto/group.dto';

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

  @Get('userId/:id')
  findGroupWithUserId(@Param('id') id: string) {
    return this.groupService.getGroupWithUserId(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthenticationGuard)
  update(@Param('id') id: string, @Body() groupDto: GroupDto) {
    return this.groupService.update(id, groupDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  remove(@Param('id') id: string) {
    return this.groupService.delete(id);
  }

  @Delete('removeUser/:id')
  @UseGuards(JwtAuthenticationGuard)
  removeUser(@Param('id') groupId: string, @Body() userId: string) {
    return this.groupService.removeUser(groupId, userId);
  }
}
