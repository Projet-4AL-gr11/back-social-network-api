import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UpdateLeaderboardExerciseRankingCommand } from '../../command/update-leaderboard-exercise-ranking.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Leaderboard } from '../../../domain/entities/leaderboard.entity';
import { Repository } from 'typeorm';
import { UpdateLeaderboardExerciseRankingEvent } from '../../event/update-leaderboard-exercise-ranking.event';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { UpdateEventRankingEvent } from '../../event/update-event-ranking.event';
import { UpdateEventRankingCommand } from '../../command/update-event-ranking.command';
import { EventRanking } from '../../../domain/entities/event-ranking.entity';
import { User } from '../../../../user/domain/entities/user.entity';
import { validate } from 'class-validator';

@CommandHandler(UpdateEventRankingCommand)
export class UpdateEventRankingHandler
  implements ICommandHandler<UpdateEventRankingCommand>
{
  constructor(
    @InjectRepository(EventRanking)
    private eventRankingRepository: Repository<EventRanking>,
    private eventBus: EventBus,
  ) {}

  async execute(command: UpdateEventRankingCommand): Promise<void> {
    try {
      for (let a = 0; a < command.participants.length; a++) {
        let score = 0;

        for (let i = 0; i < command.allLeaderboard.size; i++) {
          for (let j = 0; j < command.allLeaderboard.get(i).length; j++) {
            if (
              command.allLeaderboard.get(i)[j].user.id ===
              command.participants[a].id
            ) {
              score =
                command.participants.length -
                command.allLeaderboard.get(i)[j].ranking;
            }
          }
        }
        const eventRanking: EventRanking =
          await this.eventRankingRepository.create({
            user: command.participants[a],
            event: command.event,
            score: score,
          });

        const err = await validate(eventRanking, {
          validationError: { target: false },
        });
        if (err.length > 0) {
          throw err;
        }
        await this.eventRankingRepository.save(eventRanking);
      }
      this.eventBus.publish(new UpdateEventRankingEvent(command.event.id));
    } catch (error) {
      // TODO: retourné une vrai erreur
      this.eventBus.publish(
        new ErrorsEvent('UpdateEventRankingHandler', error),
      );
      throw error;
    }
  }
}
