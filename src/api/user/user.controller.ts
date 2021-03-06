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
import { UpdateUserDto } from './domain/dto/update-user.dto';
import { UserService } from './user.service';
import JwtRefreshGuard from '../auth/guards/jwt-refresh-token.guard';
import { RequestUser } from '../auth/interface/request-user.interface';

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

  @Get('isBlocked/:id')
  @UseGuards(JwtRefreshGuard)
  isBlocked(@Req() request: RequestUser, @Param('id') id: string) {
    return this.userService.isBlocked(request.user.id, id);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('researchUsername/:name')
  researchUsername(@Req() request: RequestUser, @Param('name') name: string) {
    const { user } = request;
    return this.userService.researchUsername(user.id, name);
  }

  @Get('hasBlocked/:id')
  @UseGuards(JwtRefreshGuard)
  hasBlocked(@Req() request: RequestUser, @Param('id') id: string) {
    return this.userService.hasBlocked(request.user.id, id);
  }

  @Get('friendships/:id')
  getFriendship(@Param('id') id: string) {
    return this.userService.getFriendship(id);
  }

  @Post('block/:id')
  @UseGuards(JwtRefreshGuard)
  blockUser(@Req() request: RequestUser, @Param('id') id: string) {
    const { user } = request;
    return this.userService.blockUser(user.id, id);
  }

  @Post('unblock/:id')
  @UseGuards(JwtRefreshGuard)
  unblockUser(@Req() request: RequestUser, @Param('id') id: string) {
    const { user } = request;
    return this.userService.unblockUser(user.id, id);
  }

  @Put('')
  @UseGuards(JwtRefreshGuard)
  update(@Req() request: RequestUser, @Body() updateUserDto: UpdateUserDto) {
    const { user } = request;
    return this.userService.update(user.id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtRefreshGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
