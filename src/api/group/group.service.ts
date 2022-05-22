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

  async removeUser(groupId: string, userId: string): Promise<void> {
    return await this.commandBus.execute(
      new RemoveUserFromGroupCommand(groupId, userId),
    );
  }

  async getAll(): Promise<Group[]> {
    return await this.queryBus.execute(new GetGroupQuery());
  }

  async getById(groupId): Promise<Group> {
    return await this.queryBus.execute(new GetGroupQuery(groupId));
  }

  async getGroupWithUserId(userId: string): Promise<GroupMembership[]> {
    return await this.queryBus.execute(
      new GetGroupMembershipWithUserIdQuery(userId),
    );
  }

  async getFollowers(groupId: string): Promise<User[]> {
    return await this.queryBus.execute(new GetGroupFollowerQuery(groupId));
  }

  async addFollower(userId: string, groupId: string): Promise<void> {
    return await this.commandBus.execute(
      new AddGroupFollowerCommand(userId, groupId),
    );
  }

  async removeFollower(userId: string, groupId: string): Promise<void> {
    return await this.commandBus.execute(
      new RemoveGroupFollowerCommand(userId, groupId),
    );
  }
}
