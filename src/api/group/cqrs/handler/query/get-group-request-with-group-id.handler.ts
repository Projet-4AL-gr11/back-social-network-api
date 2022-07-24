import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupRequest } from '../../../domain/entities/group_request.entity';
import { Repository } from 'typeorm';
import { GetGroupRequestWithGroupIdQuery } from '../../query/get-group-request-with-group-id.query';

@QueryHandler(GetGroupRequestWithGroupIdQuery)
export class GetGroupRequestWithGroupIdHandler
  implements IQueryHandler<GetGroupRequestWithGroupIdQuery>
{
  constructor(
    @InjectRepository(GroupRequest)
    private groupRequestRepository: Repository<GroupRequest>,
  ) {}

  async execute(
    query: GetGroupRequestWithGroupIdQuery,
  ): Promise<GroupRequest[]> {
    return await this.groupRequestRepository
      .createQueryBuilder()
      .leftJoinAndSelect('GroupRequest.user', 'User')
      .leftJoinAndSelect('GroupRequest.group', 'Group')
      .leftJoinAndSelect('Group.picture', 'Picture')
      .leftJoinAndSelect('User.profilePicture', 'ProfilePicture')
      .where('Group.id=:id', { id: query.groupId })
      .getMany();
  }
}
