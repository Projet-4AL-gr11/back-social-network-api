import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetGroupRequestWithUserIdQuery } from '../../query/get-group-request-with-user-id.query';
import { GroupRequest } from '../../../domain/entities/group_request.entity';

@QueryHandler(GetGroupRequestWithUserIdQuery)
export class GetGroupRequestWithUserIdHandler
  implements IQueryHandler<GetGroupRequestWithUserIdQuery>
{
  constructor(
    @InjectRepository(GroupRequest)
    private groupRequestRepository: Repository<GroupRequest>,
  ) {}

  async execute(
    query: GetGroupRequestWithUserIdQuery,
  ): Promise<GroupRequest[]> {
    return await this.groupRequestRepository
      .createQueryBuilder()
      .leftJoin('GroupRequest.user', 'User')
      .leftJoinAndSelect('GroupRequest.group', 'Group')
      .where('User.id=:id', { id: query.userId })
      .getMany();
  }
}
