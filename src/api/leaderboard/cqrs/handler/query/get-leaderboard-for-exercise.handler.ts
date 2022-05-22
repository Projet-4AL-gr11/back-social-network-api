import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetLeaderboardByIdQuery } from '../../query/get-leaderboard-by-id.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Leaderboard } from '../../../domain/entities/leaderboard.entity';
import { Repository } from 'typeorm';
import { GetLeaderboardForExerciseQuery } from '../../query/get-leaderboard-for-exercise.query';

@QueryHandler(GetLeaderboardForExerciseQuery)
export class GetLeaderboardForExerciseHandler
  implements IQueryHandler<GetLeaderboardForExerciseQuery>
{
  constructor(
    @InjectRepository(Leaderboard)
    private leaderboardRepository: Repository<Leaderboard>,
  ) {}

  async execute(query: GetLeaderboardForExerciseQuery): Promise<Leaderboard[]> {
    return await this.leaderboardRepository
      .createQueryBuilder()
      .leftJoin('exercise', 'Exercise')
      .where('Exercise.id=:id', { id: query.exerciseId })
      .getMany();
  }
}
