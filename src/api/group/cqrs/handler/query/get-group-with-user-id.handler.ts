import { GetGroupMembershipWithUserIdQuery } from '../../query/get-group-membership-with-user-id.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupMembership } from '../../../domain/entities/group_membership.entity';

@QueryHandler(GetGroupMembershipWithUserIdQuery)
export class GetGroupWithUserIdHandler
  implements IQueryHandler<GetGroupMembershipWithUserIdQuery>
{
  constructor(
    @InjectRepository(GroupMembership)
    private groupMembershipRepository: Repository<GroupMembership>,
  ) {}

  async execute(
    query: GetGroupMembershipWithUserIdQuery,
  ): Promise<GroupMembership[]> {
    return await this.groupMembershipRepository
      .createQueryBuilder()
      .leftJoinAndMapMany(
        'GroupMembership.group',
        'GroupMembership.group',
        'Group',
      )
      .leftJoin('GroupMembership.member', 'User')
      .where('User.id=:id', { id: query.userId })
      .getMany();
  }
}
