import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Leaderboard } from '../../../domain/entities/leaderboard.entity';
import { Repository } from 'typeorm';
import { GetLeaderboardForUserWithExerciseIdQuery } from '../../query/get-leaderboard-for-user-with-exercise-id.query';

@QueryHandler(GetLeaderboardForUserWithExerciseIdQuery)
export class GetLeaderboardForUserWithExerciseIdHandler
  implements IQueryHandler<GetLeaderboardForUserWithExerciseIdQuery>
{
  constructor(
    @InjectRepository(Leaderboard)
    private leaderboardRepository: Repository<Leaderboard>,
  ) {}

  async execute(
    query: GetLeaderboardForUserWithExerciseIdQuery,
  ): Promise<Leaderboard> {
    return await this.leaderboardRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Leaderboard.user', 'User')
      .leftJoinAndSelect('Leaderboard.exercise', 'Exercise')
      .where('User.id=:id', { id: query.userId })
      .andWhere('Exercise.id=:id', { id: query.exerciseId })
      .getOne();
  }
}
