import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/passport-local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserRepository } from '../user/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { User } from "../user/entities/user.entity";
import { RegisterHandler } from "./handler/register.handler";
import { CqrsModule } from "@nestjs/cqrs";

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
  providers: [AuthService, LocalStrategy, JwtStrategy, RegisterHandler],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
