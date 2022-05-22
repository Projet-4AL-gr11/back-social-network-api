import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetGroupFollowerQuery } from '../../query/get-group-follower.query';
import { User } from '../../../../user/domain/entities/user.entity';

@QueryHandler(GetGroupFollowerQuery)
export class GetGroupFollowerHandler
  implements IQueryHandler<GetGroupFollowerQuery>
{
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(query: GetGroupFollowerQuery): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder()
      .leftJoin('User.followedGroups', 'Group')
      .where('Group.id=:id', { id: query.groupId })
      .getMany();
  }
}
