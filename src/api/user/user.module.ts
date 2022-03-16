import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { GetUserHandler } from './cqrs/handler/get-user.handler';
import { DeleteUserHandler } from './cqrs/handler/delete-user.handler';
import { UpdateUserHandler } from './cqrs/handler/update-user.handler';
import { User } from './domain/entities/user.entity';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CqrsModule],
  controllers: [UserController],
  providers: [
    DeleteUserHandler,
    GetUserHandler,
    UpdateUserHandler,
  ],
})
export class UserModule {}
