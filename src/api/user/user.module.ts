import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { GetUserHandler } from './cqrs/handler/get-user.handler';
import { DeleteUserHandler } from './cqrs/handler/delete-user.handler';
import { UpdateUserHandler } from './cqrs/handler/update-user.handler';
import { User } from './domain/entities/user.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { GetUserIfRefreshTokenMatchesHandler } from './cqrs/handler/get-user-if-refresh-token-matches.handler';
import { RemoveRefreshTokenHandler } from './cqrs/handler/remove-refresh-token.handler';
import { SetCurrentRefreshTokenHandler } from './cqrs/handler/set-current-refresh-token.handler';
import { UserService } from './user.service';
import { GetUserLoginQuery } from './cqrs/query/get-user-login.query';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CqrsModule],
  controllers: [UserController],
  providers: [
    UserService,
    DeleteUserHandler,
    GetUserHandler,
    UpdateUserHandler,
    GetUserIfRefreshTokenMatchesHandler,
    RemoveRefreshTokenHandler,
    SetCurrentRefreshTokenHandler,
    GetUserLoginQuery,
  ],
})
export class UserModule {}
