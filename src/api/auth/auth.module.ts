import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/passport-local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { User } from '../user/domain/entities/user.entity';
import { RegisterHandler } from './cqrs/handler/register.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtRefreshTokenStrategy } from './strategy/jwt-refresh-token.strategy';
import { UserService } from '../user/user.service';
import { GetUserLoginHandler } from '../user/cqrs/handler/get-user-login.handler';

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
    ConfigModule,
    CqrsModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtRefreshTokenStrategy,
    RegisterHandler,
    UserService,
    GetUserLoginHandler,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
