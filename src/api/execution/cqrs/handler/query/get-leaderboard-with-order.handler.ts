import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Leaderboard } from '../../../domain/entities/leaderboard.entity';
import { Repository } from 'typeorm';
import { GetLeaderboardWithOrderQuery } from '../../query/get-leaderboard-with-order.query';

@QueryHandler(GetLeaderboardWithOrderQuery)
export class GetLeaderboardWithOrderHandler
  implements IQueryHandler<GetLeaderboardWithOrderQuery>
{
  constructor(
    @InjectRepository(Leaderboard)
    private leaderboardRepository: Repository<Leaderboard>,
  ) {}

  async execute(query: GetLeaderboardWithOrderQuery): Promise<Leaderboard[]> {
    return await this.leaderboardRepository
      .createQueryBuilder()
      .leftJoin('Leaderboard.exercise', 'Exercise')
      .leftJoinAndSelect('Leaderboard.user', 'User')
      .where('Exercise.id=:id', { id: query.exerciseId })
      .orderBy('Leaderboard.timerScore', 'ASC')
      .getMany();
  }
}
