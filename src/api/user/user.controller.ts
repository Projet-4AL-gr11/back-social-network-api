import { ContextCreator } from '@nestjs/core/helpers/context-creator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDto } from './domain/dto/update-user.dto';
import JwtAuthenticationGuard from '../auth/guards/jwt-auth.guard';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUserQuery } from './cqrs/query/get-user.query';
import { UpdateUserCommand } from './cqrs/command/update-user.command';
import { DeleteUserCommand } from './cqrs/command/delete-user.command';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthenticationGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
