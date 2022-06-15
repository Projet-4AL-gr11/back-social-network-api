import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Group } from './domain/entities/group.entity';
import { GroupMembership } from './domain/entities/group_membership.entity';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { CreateGroupHandler } from './cqrs/handler/command/create-group.handler';
import { DeleteGroupHandler } from './cqrs/handler/command/delete-group.handler';
import { GetGroupHandler } from './cqrs/handler/query/get-group.handler';
import { GetGroupWithUserIdHandler } from './cqrs/handler/query/get-group-with-user-id.handler';
import { RemoveUserFromGroupHandler } from './cqrs/handler/command/remove-user-from-group.handler';
import { UpdateGroupHandler } from './cqrs/handler/command/update-group.handler';
import { AddGroupFollowerHandler } from './cqrs/handler/command/add-group-follower.handler';
import { RemoveGroupFollowerHandler } from './cqrs/handler/command/remove-group-follower.handler';
import { GetGroupFollowerHandler } from './cqrs/handler/query/get-group-follower.handler';
import { User } from '../user/domain/entities/user.entity';
import { GetGroupWhereUserIsAdminHandler } from './cqrs/handler/query/get-group-where-user-is-admin.handler';
import { IsUserGroupAdminHandler } from './cqrs/handler/query/is-user-group-admin.handler';
import { IsUserGroupOwnerHandler } from './cqrs/handler/query/is-user-group-owner.handler';
import { GiveAdminRightHandler } from './cqrs/handler/command/give-admin-right.handler';
import { RemoveAdminRightHandler } from './cqrs/handler/command/remove-admin-right.handler';
import { GroupRequest } from './domain/entities/group_request.entity';
import { AcceptGroupRequestEventHandler } from './cqrs/event-handler/accept-group-request.event-handler';
import { CancelGroupRequestHandler } from './cqrs/handler/command/cancel-group-request.handler';
import { GiveGroupOwnershipHandler } from './cqrs/handler/command/give-group-ownership.handler';
import { SendGroupRequestHandler } from './cqrs/handler/command/send-group-request.handler';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group, GroupMembership, User, GroupRequest]),
    CqrsModule,
  ],
  controllers: [GroupController],
  providers: [
    GroupService,
    CreateGroupHandler,
    DeleteGroupHandler,
    GetGroupHandler,
    GetGroupWithUserIdHandler,
    RemoveUserFromGroupHandler,
    UpdateGroupHandler,
    AddGroupFollowerHandler,
    RemoveGroupFollowerHandler,
    GetGroupFollowerHandler,
    GetGroupWhereUserIsAdminHandler,
    IsUserGroupAdminHandler,
    IsUserGroupOwnerHandler,
    GiveAdminRightHandler,
    RemoveAdminRightHandler,
    AcceptGroupRequestEventHandler,
    CancelGroupRequestHandler,
    GiveGroupOwnershipHandler,
    SendGroupRequestHandler,
  ],
})
export class GroupModule {}
