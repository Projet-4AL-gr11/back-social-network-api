import { GetGroupMembershipWithUserIdQuery } from '../../query/get-group-membership-with-user-id.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupMembership } from '../../../domain/entities/group_membership.entity';
import { Group } from '../../../domain/entities/group.entity';

@QueryHandler(GetGroupMembershipWithUserIdQuery)
export class GetGroupWithUserIdHandler
  implements IQueryHandler<GetGroupMembershipWithUserIdQuery>
{
  constructor(
    @InjectRepository(Group)
    private groupMembershipRepository: Repository<Group>,
  ) {}

  async execute(query: GetGroupMembershipWithUserIdQuery): Promise<Group[]> {
    return await this.groupMembershipRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Group.members', 'GroupMembership')
      .leftJoinAndSelect('Group.picture', 'Picture')
      .leftJoinAndSelect('GroupMembership.user', 'User')
      .where('User.id=:id', { id: query.userId })
      .getMany();
  }
}
