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
import { UserService } from './user.service';
import JwtRefreshGuard from '../auth/guards/jwt-refresh-token.guard';

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
  @UseGuards(JwtRefreshGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtRefreshGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
