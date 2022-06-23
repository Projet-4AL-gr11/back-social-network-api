import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
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
      .leftJoin('Leaderboard.exercise', 'Exercise')
      .leftJoinAndSelect('Leaderboard.user', 'User')
      .where('Exercise.id=:id', { id: query.exerciseId })
      .orderBy('Leaderboard.ranking', 'DESC')
      .getMany();
  }
}
