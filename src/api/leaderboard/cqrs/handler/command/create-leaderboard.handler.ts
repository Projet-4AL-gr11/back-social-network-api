import { CreateLeaderboardCommand } from '../../command/create-leaderboard.command';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Leaderboard } from '../../../domain/entities/leaderboard.entity';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { CreateEventEvent } from '../../../../event/cqrs/event/create-event.event';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { CreateLeaderboardEvent } from '../../event/create-leaderboard.event';

@CommandHandler(CreateLeaderboardCommand)
export class CreateLeaderboardHandler
  implements ICommandHandler<CreateLeaderboardCommand>
{
  constructor(
    @InjectRepository(Leaderboard)
    private leaderboardRepository: Repository<Leaderboard>,
    private eventBus: EventBus,
  ) {}

  async execute(command: CreateLeaderboardCommand): Promise<Leaderboard> {
    try {
      const currentDate: Date = new Date(Date.now());
      if (currentDate > command.exercise.event.endDate) {
        const leaderboard = await this.leaderboardRepository.create({
          user: command.user,
          exercise: command.exercise,
          userEntry: command.userEntry,
        });
        const err = await validate(leaderboard, {
          validationError: { target: false },
        });
        if (err.length > 0) {
          throw err;
        }
        const newLeaderboard = await this.leaderboardRepository.save(
          leaderboard,
        );
        this.eventBus.publish(
          new CreateLeaderboardEvent(
            newLeaderboard.id,
            leaderboard.user.id,
            leaderboard.exercise.id,
            leaderboard.language.name,
          ),
        );
        return newLeaderboard;
      } else {
        // TODO: retourné une vrai erreur
        throw 'Exercise have finished';
      }
    } catch (error) {
      // TODO: retourné une vrai erreur
      this.eventBus.publish(new ErrorsEvent('CreateLeaderboardHandler', error));
      throw error;
    }
  }
}
