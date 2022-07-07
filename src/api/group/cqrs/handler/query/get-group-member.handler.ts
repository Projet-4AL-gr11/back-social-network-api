import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupMembership } from '../../../domain/entities/group_membership.entity';
import { Repository } from 'typeorm';
import { GetGroupMemberQuery } from '../../query/get-group-member.query';

@QueryHandler(GetGroupMemberQuery)
export class GetGroupMemberHandler
  implements IQueryHandler<GetGroupMemberQuery>
{
  constructor(
    @InjectRepository(GroupMembership)
    private groupMembershipRepository: Repository<GroupMembership>,
  ) {}

  async execute(query: GetGroupMemberQuery): Promise<GroupMembership[]> {
    return this.groupMembershipRepository
      .createQueryBuilder()
      .leftJoinAndSelect('GroupMembership.group', 'Group')
      .leftJoinAndSelect('GroupMembership.user', 'User')
      .leftJoinAndSelect('User.profilePicture', 'Media')
      .where('Group.id=:groupId', { groupId: query.groupId })
      .getMany();
  }
}
