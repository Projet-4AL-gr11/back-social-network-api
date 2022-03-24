import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Group } from './domain/entities/group.entity';
import { GroupMembership } from './domain/entities/group_membership.entity';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { CreateGroupHandler } from './cqrs/handler/create-group.handler';
import { DeleteGroupHandler } from './cqrs/handler/delete-group.handler';
import { GetGroupHandler } from './cqrs/handler/get-group.handler';
import { GetGroupWithUserIdHandler } from './cqrs/handler/get-group-with-user-id.handler';
import { RemoveUserFromGroupHandler } from './cqrs/handler/remove-user-from-group.handler';
import { UpdateGroupHandler } from './cqrs/handler/update-group.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Group, GroupMembership]), CqrsModule],
  controllers: [GroupController],
  providers: [
    GroupService,
    CreateGroupHandler,
    DeleteGroupHandler,
    GetGroupHandler,
    GetGroupWithUserIdHandler,
    RemoveUserFromGroupHandler,
    UpdateGroupHandler,
  ],
})
export class GroupModule {}
