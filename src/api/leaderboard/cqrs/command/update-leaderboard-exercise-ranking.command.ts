import { Leaderboard } from '../../domain/entities/leaderboard.entity';

export class UpdateLeaderboardExerciseRankingCommand {
  constructor(
    public readonly exerciseId: string,
    public readonly leaderboards: Leaderboard[],
  ) {}
}
