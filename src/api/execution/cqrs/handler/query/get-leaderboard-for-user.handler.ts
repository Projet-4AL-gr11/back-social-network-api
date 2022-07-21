import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Leaderboard } from '../../../domain/entities/leaderboard.entity';
import { Repository } from 'typeorm';
import { GetLeaderboardForUserQuery } from '../../query/get-leaderboard-for-user.query';

@QueryHandler(GetLeaderboardForUserQuery)
export class GetLeaderboardForUserHandler
  implements IQueryHandler<GetLeaderboardForUserQuery>
{
  constructor(
    @InjectRepository(Leaderboard)
    private leaderboardRepository: Repository<Leaderboard>,
  ) {}

  async execute(query: GetLeaderboardForUserQuery): Promise<Leaderboard[]> {
    return await this.leaderboardRepository
      .createQueryBuilder()
      .leftJoin('user', 'User')
      .where('User.id=:id', { id: query.userId })
      .getMany();
  }
}
