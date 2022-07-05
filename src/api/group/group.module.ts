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
import { GetGroupRequestWithUserIdHandler } from './cqrs/handler/query/get-group-request-with-user-id.handler';
import { AcceptGroupRequestHandler } from './cqrs/handler/command/accept-group-request.handler';
import { AddGroupFollowerEventHandler } from './cqrs/event-handler/add-group-follower.event-handler';
import { CancelGroupRequestEventHandler } from './cqrs/event-handler/cancel-group-request.event-handler';
import { CreateGroupEventHandler } from './cqrs/event-handler/create-group.event-handler';
import { DeleteGroupEventHandler } from './cqrs/event-handler/delete-group.event-handler';
import { GiveAdminRightEventHandler } from './cqrs/event-handler/give-admin-right.event-handler';
import { GiveGroupOwnershipEventHandler } from './cqrs/event-handler/give-group-ownership.event-handler';
import { RemoveAdminRightEventHandler } from './cqrs/event-handler/remove-admin-right.event-handler';
import { RemoveGroupFollowEventHandler } from './cqrs/event-handler/remove-group-follow.event-handler';
import { RemoveUserFromGroupEventHandler } from './cqrs/event-handler/remove-user-from-group.event-handler';
import { SendGroupRequestEventHandler } from './cqrs/event-handler/send-group-request.event-handler';
import { UpdateGroupEventHandler } from './cqrs/event-handler/update-group.event-handler';
import { ErrorEventHandler } from "../../util/error/error.event-handler";
import { GetGroupRequestStatusHandler } from "./cqrs/handler/query/get-group-request-status.handler";
import { GetGroupRequestWithGroupIdHandler } from "./cqrs/handler/query/get-group-request-with-group-id.handler";

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
    CancelGroupRequestHandler,
    GiveGroupOwnershipHandler,
    SendGroupRequestHandler,
    GetGroupRequestWithUserIdHandler,
    AcceptGroupRequestHandler,
    AcceptGroupRequestEventHandler,
    AddGroupFollowerEventHandler,
    CancelGroupRequestEventHandler,
    CreateGroupEventHandler,
    DeleteGroupEventHandler,
    GiveAdminRightEventHandler,
    GiveGroupOwnershipEventHandler,
    RemoveAdminRightEventHandler,
    RemoveGroupFollowEventHandler,
    RemoveUserFromGroupEventHandler,
    SendGroupRequestEventHandler,
    UpdateGroupEventHandler,
    GetGroupRequestStatusHandler,
    GetGroupRequestWithGroupIdHandler,
    ErrorEventHandler,
  ],
})
export class GroupModule {}
