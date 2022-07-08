import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetGroupRequestStatusQuery } from '../../query/get-group-request-status.query';
import { GroupRequestStatus } from '../../../domain/enum/group-request-status.enum';
import { GroupRequest } from '../../../domain/entities/group_request.entity';
import { GroupMembership } from '../../../domain/entities/group_membership.entity';

@QueryHandler(GetGroupRequestStatusQuery)
export class GetGroupRequestStatusHandler
  implements IQueryHandler<GetGroupRequestStatusQuery>
{
  constructor(
    @InjectRepository(GroupRequest)
    private groupRequestRepository: Repository<GroupRequest>,
    @InjectRepository(GroupMembership)
    private groupMembershipRepository: Repository<GroupMembership>,
  ) {}

  async execute(
    query: GetGroupRequestStatusQuery,
  ): Promise<GroupRequestStatus> {
    if (
      (await this.groupMembershipRepository
        .createQueryBuilder()
        .leftJoinAndSelect('GroupMembership.user', 'User')
        .leftJoinAndSelect('GroupMembership.group', 'Group')
        .where('(User.id=:userId AND Group.id=:groupId)', {
          userId: query.userId,
          groupId: query.groupId,
        })
        .getOne()) !== undefined
    ) {
      return GroupRequestStatus.JOINED;
    } else if (
      (await this.groupRequestRepository
        .createQueryBuilder()
        .leftJoinAndSelect('GroupRequest.user', 'User')
        .leftJoinAndSelect('GroupRequest.group', 'Group')
        .where('(User.id=:userId AND Group.id=:groupId)', {
          userId: query.userId,
          groupId: query.groupId,
        })
        .getOne()) !== undefined
    ) {
      return GroupRequestStatus.PENDING;
    }
    return GroupRequestStatus.NONE;
  }
}
