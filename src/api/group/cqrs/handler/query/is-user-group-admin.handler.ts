import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IsUserGroupAdminQuery } from '../../query/is-user-group-admin.query';
import { GroupMembership } from '../../../domain/entities/group_membership.entity';

@QueryHandler(IsUserGroupAdminQuery)
export class IsUserGroupAdminHandler
  implements IQueryHandler<IsUserGroupAdminQuery>
{
  constructor(
    @InjectRepository(GroupMembership)
    private groupMembershipRepository: Repository<GroupMembership>,
  ) {}

  async execute(query: IsUserGroupAdminQuery): Promise<any> {
    const membership = await this.groupMembershipRepository
      .createQueryBuilder()
      .leftJoinAndSelect('GroupMembership.group', 'Group')
      .leftJoinAndSelect('GroupMembership.user', 'User')
      .where('Group.id=:groupId', { groupId: query.groupId })
      .andWhere('User.id=:userId', { userId: query.userId })
      .andWhere('GroupMembership.isAdmin=true')
      .getOne();
    return membership !== undefined;
  }
}
