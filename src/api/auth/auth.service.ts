import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../user/domain/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './interface/token-payload.interface';
import { SignUpDto } from './dto/sign-up.dto';
import { RegisterCommand } from './cqrs/command/register.command';
import { GetUserLoginQuery } from '../user/cqrs/query/get-user-login.query';
import { GetUserQuery } from '../user/cqrs/query/get-user.query';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  async signup(signUpDto: SignUpDto) {
    return this.commandBus.execute(
      new RegisterCommand(
        signUpDto.username,
        signUpDto.email,
        signUpDto.password,
      ),
    );
  }

  async login(username: string, plainTextPassword: string): Promise<User> {
    try {
      const user = await this.queryBus.execute(new GetUserLoginQuery(username));

      if (!(await this.verifyPassword(plainTextPassword, user.password))) {
        throw new HttpException(
          'Wrong credentials provided',
          HttpStatus.BAD_REQUEST,
        );
      }
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }

  public getCookieWithJwtToken(userId: string) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME}s`,
    });
    return {
      token: token,
      auth: `Authentication=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME}`,
    };
  }

  public getCookieWithJwtRefreshToken(userId: string) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: `${process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME}s`,
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME}`;
    return {
      cookie,
      token,
    };
  }

  public getCookieForLogOut() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }

  async getUserFromAuthToken(authenticationToken: string) {
    const payload: TokenPayload = this.jwtService.verify(authenticationToken, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    });
    if (payload.userId) {
      return this.queryBus.execute(new GetUserQuery(payload.userId));
    }
  }
}
