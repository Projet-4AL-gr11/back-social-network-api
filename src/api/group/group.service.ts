import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Group } from './domain/entities/group.entity';
import { User } from '../user/domain/entities/user.entity';
import { GroupDto } from './domain/dto/group.dto';
import { CreateGroupCommand } from './cqrs/command/create-group.command';
import { UpdateGroupCommand } from './cqrs/command/update-group.command';
import { DeleteGroupCommand } from './cqrs/command/delete-group.command';
import { RemoveUserFromGroupCommand } from './cqrs/command/remove-user-from-group.command';
import { GetGroupQuery } from './cqrs/query/get-group.query';
import { GetGroupMembershipWithUserIdQuery } from './cqrs/query/get-group-membership-with-user-id.query';
import { GroupMembership } from './domain/entities/group_membership.entity';
import { GetGroupFollowerQuery } from './cqrs/query/get-group-follower.query';
import { AddGroupFollowerCommand } from './cqrs/command/add-group-follower.command';
import { RemoveGroupFollowerCommand } from './cqrs/command/remove-group-follower.command';
import { GetUserQuery } from '../user/cqrs/query/get-user.query';
import { GetGroupWhereUserIsAdminQuery } from './cqrs/query/get-group-where-user-is-admin.query';
import { IsUserGroupOwnerQuery } from './cqrs/query/is-user-group-owner.query';
import { IsUserGroupAdminQuery } from './cqrs/query/is-user-group-admin.query';
import { GiveAdminRightCommand } from './cqrs/command/give-admin-right.command';
import { RemoveAdminRightCommand } from './cqrs/command/remove-admin-right.command';
import { GiveGroupOwnershipCommand } from './cqrs/command/give-group-ownership.command';
import { AcceptGroupRequestCommand } from './cqrs/command/accept-group-request.command';
import { CancelGroupRequestCommand } from './cqrs/command/cancel-group-request.command';
import { SendGroupRequestCommand } from './cqrs/command/send-group-request.command';
import { GetGroupRequestWithUserIdQuery } from './cqrs/query/get-group-request-with-user-id.query';
import { GetGroupRequestStatusQuery } from './cqrs/query/get-group-request-status.query';
import { GetGroupRequestWithGroupIdQuery } from './cqrs/query/get-group-request-with-group-id.query';
import { GroupRequest } from './domain/entities/group_request.entity';
import { GetGroupMemberQuery } from './cqrs/query/get-group-member.query';

@Injectable()
export class GroupService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  async create(userId: string, groupDto: GroupDto): Promise<Group> {
    const user = await this.queryBus.execute(new GetUserQuery(userId));
    return await this.commandBus.execute(
      new CreateGroupCommand(user, groupDto),
    );
  }

  async update(groupId: string, groupDto: GroupDto): Promise<Group> {
    await this.commandBus.execute(new UpdateGroupCommand(groupId, groupDto));
    return this.getById(groupId);
  }

  async delete(groupId: string): Promise<void> {
    return await this.commandBus.execute(new DeleteGroupCommand(groupId));
  }

  async getAll(): Promise<Group[]> {
    return await this.queryBus.execute(new GetGroupQuery());
  }

  async getById(groupId): Promise<Group> {
    return await this.queryBus.execute(new GetGroupQuery(groupId));
  }

  async getGroupWithUserId(userId: string): Promise<Group[]> {
    return await this.queryBus.execute(
      new GetGroupMembershipWithUserIdQuery(userId),
    );
  }

  async getMembers(groupId: string): Promise<GroupMembership[]> {
    return await this.queryBus.execute(new GetGroupMemberQuery(groupId));
  }

  getFollowers(groupId: string): Promise<User[]> {
    return this.queryBus.execute(new GetGroupFollowerQuery(groupId));
  }

  async addFollower(userId: string, groupId: string): Promise<void> {
    const user = await this.queryBus.execute(new GetUserQuery(userId));
    const group = await this.queryBus.execute(new GetGroupQuery(groupId));
    return await this.commandBus.execute(
      new AddGroupFollowerCommand(user, group),
    );
  }

  async removeFollower(userId: string, groupId: string): Promise<void> {
    return await this.commandBus.execute(
      new RemoveGroupFollowerCommand(userId, groupId),
    );
  }

  async getWhereUserIsAdmin(userId: string): Promise<Group[]> {
    return await this.queryBus.execute(
      new GetGroupWhereUserIsAdminQuery(userId),
    );
  }

  async removeUser(groupId: string, userId: string): Promise<void> {
    return await this.commandBus.execute(
      new RemoveUserFromGroupCommand(groupId, userId),
    );
  }

  async isUserOwner(groupId: string, userId: string): Promise<boolean> {
    return await this.queryBus.execute(
      new IsUserGroupOwnerQuery(groupId, userId),
    );
  }

  async isUserAdmin(groupId: string, userId: string): Promise<boolean> {
    return await this.queryBus.execute(
      new IsUserGroupAdminQuery(groupId, userId),
    );
  }

  async giveAdminRight(groupId: string, userId: string) {
    return await this.commandBus.execute(
      new GiveAdminRightCommand(groupId, userId),
    );
  }

  async removeAdminRight(groupId: string, userId: string) {
    return await this.commandBus.execute(
      new RemoveAdminRightCommand(groupId, userId),
    );
  }

  async giveGroupOwnership(groupId: string, ownerId: string, userId: string) {
    return await this.commandBus.execute(
      new GiveGroupOwnershipCommand(groupId, ownerId, userId),
    );
  }

  async acceptGroupRequest(groupId: string, userId: string) {
    const group = await this.queryBus.execute(new GetGroupQuery(groupId));
    const user = await this.queryBus.execute(new GetUserQuery(userId));
    await this.commandBus.execute(new AcceptGroupRequestCommand(user, group));
    await this.commandBus.execute(
      new CancelGroupRequestCommand(userId, groupId),
    );
    return;
  }

  async cancelGroupRequest(groupId: string, userId: string) {
    return this.commandBus.execute(
      new CancelGroupRequestCommand(userId, groupId),
    );
  }

  async sendGroupRequest(groupId: string, userId: string) {
    const group = await this.queryBus.execute(new GetGroupQuery(groupId));
    const user = await this.queryBus.execute(new GetUserQuery(userId));
    return this.commandBus.execute(new SendGroupRequestCommand(user, group));
  }

  async getGroupRequestWithUserId(id: string) {
    return this.queryBus.execute(new GetGroupRequestWithUserIdQuery(id));
  }

  async getGroupRequestStatus(userId: string, groupId: string) {
    return this.queryBus.execute(
      new GetGroupRequestStatusQuery(userId, groupId),
    );
  }

  async getGroupRequestWhereAdmin(userId: string) {
    const groups = await this.getWhereUserIsAdmin(userId);
    let groupRequest: GroupRequest[] = [];
    for (const group of groups) {
      groupRequest = groupRequest.concat(
        await this.queryBus.execute(
          new GetGroupRequestWithGroupIdQuery(group.id),
        ),
      );
    }
    return groupRequest;
  }

  async GetGroupRequestWithGroupIdQuery(groupId: string) {
    return await this.queryBus.execute(
      new GetGroupRequestWithGroupIdQuery(groupId),
    );
  }
}
