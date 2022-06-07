import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupMembership } from '../../../domain/entities/group_membership.entity';
import { Repository } from 'typeorm';
import { IsUserGroupOwnerQuery } from '../../query/is-user-group-owner.query';

@QueryHandler(IsUserGroupOwnerQuery)
export class IsUserGroupOwnerHandler
  implements IQueryHandler<IsUserGroupOwnerQuery>
{
  constructor(
    @InjectRepository(GroupMembership)
    private groupMembershipRepository: Repository<GroupMembership>,
  ) {}

  async execute(query: IsUserGroupOwnerQuery): Promise<any> {
    const membership = await this.groupMembershipRepository
      .createQueryBuilder()
      .leftJoinAndSelect('GroupMembership.group', 'Group')
      .leftJoinAndSelect('GroupMembership.user', 'User')
      .where('Group.id=:groupId', { groupId: query.groupId })
      .andWhere('User.id=:userId', { userId: query.userId })
      .andWhere('GroupMembership.isOwner=true')
      .getOne();
    return membership !== undefined;
  }
}
