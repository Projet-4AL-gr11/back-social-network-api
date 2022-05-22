import { SignUpDto } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { User } from '../user/domain/entities/user.entity';
import { LocalAuthenticationGuard } from './guards/auth.guard';
import { RequestUser } from './interface/request-user.interface';
import { Response } from 'express';
import JwtRefreshGuard from './guards/jwt-refresh-token.guard';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('/register')
  async signUp(@Body() signUpDto: SignUpDto): Promise<User> {
    return await this.authService.signup(signUpDto);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('/login')
  async signIn(@Req() request: RequestUser, @Res() response: Response) {
    const { user } = request;
    const accessTokenCookie = this.authService.getCookieWithJwtToken(user.id);
    const refreshTokenCookie = this.authService.getCookieWithJwtRefreshToken(
      user.id,
    );
    await this.userService.setCurrentRefreshToken(
      refreshTokenCookie.token,
      user.id,
    );
    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie.cookie,
    ]);
    user.password = undefined;
    return response.send(user);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('logout')
  async logOut(@Req() request: RequestUser, @Res() response: Response) {
    await this.userService.removeRefreshToken(request.user.id);
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }

  //getCurrentUser
  @UseGuards(JwtRefreshGuard)
  @Get('actual')
  authenticate(@Req() request: RequestUser) {
    const user = request.user;
    return user;
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: RequestUser) {
    const accessTokenCookie = this.authService.getCookieWithJwtToken(
      request.user.id,
    );

    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return request.user;
  }
}
