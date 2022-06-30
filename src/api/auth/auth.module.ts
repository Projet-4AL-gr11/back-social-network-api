import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/passport-local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { User } from '../user/domain/entities/user.entity';
import { RegisterHandler } from './cqrs/handler/command/register.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtRefreshTokenStrategy } from './strategy/jwt-refresh-token.strategy';
import { UserService } from '../user/user.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { GetUserLoginHandler } from '../user/cqrs/handler/query/get-user-login.handler';
import { RegisterEventHandler } from './cqrs/event-handler/register.event-handler';
import { ErrorEventHandler } from "../../util/error/error.event-handler";

config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRATION_TIME,
      },
    }),
    PassportModule,
    TypeOrmModule.forFeature([User]),
    CqrsModule,
  ],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    RegisterHandler,
    GetUserLoginHandler,
    RegisterEventHandler,
    ErrorEventHandler,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
