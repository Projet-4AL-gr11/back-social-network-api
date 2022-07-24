import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupMembership } from '../../../domain/entities/group_membership.entity';
import { Brackets, Repository } from 'typeorm';
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
      .leftJoinAndSelect('GroupMembership.user', 'User')
      .leftJoinAndSelect('GroupMembership.group', 'Group')
      .where('User.id=:userId', { userId: query.id })
      .andWhere('GroupMembership.isAdmin=true OR GroupMembership.isOwner=true')
      .getMany();
    for (const groupMembership of groupMemberships) {
      if (
        (await this.groupRepository
          .createQueryBuilder()
          .leftJoinAndSelect('Group.members', 'GroupMembership')
          .leftJoinAndSelect('GroupMembership.user', 'User')
          .where('User.id=:id', { id: query.id })
          .andWhere('Group.id=:groupId', {
            groupId: groupMembership.group.id,
          })
          .andWhere(
            new Brackets((qb) => {
              qb.where('GroupMembership.isAdmin=TRUE').orWhere(
                'GroupMembership.isOwner=TRUE',
              );
            }),
          )
          .getOne()) !== undefined
      ) {
        groups.push(groupMembership.group);
      }
    }
    return groups;
  }
}
