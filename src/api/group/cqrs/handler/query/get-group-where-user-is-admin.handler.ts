import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupMembership } from '../../../domain/entities/group_membership.entity';
import { Repository } from 'typeorm';
import { GetGroupWhereUserIsAdminQuery } from '../../query/get-group-where-user-is-admin.query';
import { Group } from '../../../domain/entities/group.entity';

@QueryHandler(GetGroupWhereUserIsAdminQuery)
export class GetGroupWhereUserIsAdminHandler
  implements IQueryHandler<GetGroupWhereUserIsAdminQuery>
{
  constructor(
    @InjectRepository(GroupMembership)
    private groupMembershipRepository: Repository<GroupMembership>,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  async execute(query: GetGroupWhereUserIsAdminQuery): Promise<Group[]> {
    const groups: Group[] = [];
    const groupMemberships = await this.groupMembershipRepository
      .createQueryBuilder()
      .leftJoinAndSelect('GroupMembership.group', 'Group')
      .leftJoinAndSelect('Group.user', 'User')
      .where('User.id=:userId', { userId: query.id })
      .andWhere('GroupMembership.isAdmin=true OR GroupMembership.isOwner=true')
      .getMany();
    for (const groupMembership of groupMemberships) {
      const groupId = groupMembership.group.id;
      if (
        (await this.groupRepository
          .createQueryBuilder()
          .leftJoinAndSelect('GroupMembership.user', 'User')
          .where('User.id=:id', { id: query.id })
          .getOne()) === undefined &&
        (await this.groupRepository
          .createQueryBuilder()
          .leftJoinAndSelect('Group.invitedUsers', 'InvitedUser')
          .where('InvitedUser.id=:id', { id: query.id })
          .andWhere('Group.id=:groupId', { groupId })
          .getOne()) === undefined
      ) {
        groups.push(groupMembership.group);
      }
    }
    return groups;
  }
}
