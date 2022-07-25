import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Leaderboard } from '../../../domain/entities/leaderboard.entity';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { UpdateLeaderboardExerciseRankingEvent } from '../../event/update-leaderboard-exercise-ranking.event';
import { UpdateLeaderboardExerciseRankingCommand } from '../../command/update-leaderboard-exercise-ranking.command';

@CommandHandler(UpdateLeaderboardExerciseRankingCommand)
export class UpdateLeaderboardExerciseRankingHandler
  implements ICommandHandler<UpdateLeaderboardExerciseRankingCommand>
{
  constructor(
    @InjectRepository(Leaderboard)
    private leaderboardRepository: Repository<Leaderboard>,
    private eventBus: EventBus,
  ) {}

  async execute(
    command: UpdateLeaderboardExerciseRankingCommand,
  ): Promise<void> {
    try {
      for (let i = 0; i < command.leaderboards.length; i++) {
        command.leaderboards[i].ranking = i + 1;
      }
      await this.leaderboardRepository.save(command.leaderboards);
      this.eventBus.publish(
        new UpdateLeaderboardExerciseRankingEvent(command.exerciseId),
      );
    } catch (error) {
      this.eventBus.publish(
        new ErrorsEvent('UpdateLeaderboardExerciseRankingHandler', error),
      );
      throw error;
    }
  }
}
