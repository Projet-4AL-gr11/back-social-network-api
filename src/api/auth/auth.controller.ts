import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { LocalAuthenticationGuard } from './guards/auth.guard';
import { RequestUser } from './interface/request-user.interface';
import JwtAuthenticationGuard from './guards/jwt-auth.guard';
import { Response } from 'express';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterCommand } from './command/register.command';

@Controller('auth')
export class AuthController {
  private logger = new Logger('AuthController');

  constructor(
    private readonly commandBus: CommandBus,
    private readonly authService: AuthService,
  ) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<User> {
    return this.commandBus.execute(
      new RegisterCommand(signUpDto.email, signUpDto.email, signUpDto.password),
    );
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('/signin')
  signIn(@Req() request: RequestUser, @Res() response: Response) {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return response.send(user);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('/signout')
  async logOut(@Req() request: RequestUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }

  //getCurrentUser
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}
