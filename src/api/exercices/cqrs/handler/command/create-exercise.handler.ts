import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { CreateExerciseCommand } from '../../command/create-exercise.command';
import { Exercise } from '../../../domain/entities/exercise.entity';
import { CreateExerciseEvent } from '../../event/create-exercise.event';

@CommandHandler(CreateExerciseCommand)
export class CreateExerciseHandler
  implements ICommandHandler<CreateExerciseCommand>
{
  constructor(
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
    private eventBus: EventBus,
  ) {}

  async execute(command: CreateExerciseCommand): Promise<Exercise> {
    try {
      const exercise = await this.exerciseRepository.create({
        name: command.name,
      });
      const err = await validate(exercise, {
        validationError: { target: false },
      });
      if (err.length > 0) {
        throw err;
      }
      const newExercise = await this.exerciseRepository.save(exercise);

      await this.exerciseRepository
        .createQueryBuilder()
        .relation(Exercise, 'exerciseTemplate')
        .of(exercise.id)
        .set(command.exerciseTemplateId);
      await this.exerciseRepository
        .createQueryBuilder()
        .relation(Exercise, 'event')
        .of(exercise.id)
        .set(command.eventId);
      this.eventBus.publish(
        new CreateExerciseEvent(
          command.exerciseTemplateId,
          command.eventId,
          newExercise.id,
        ),
      );
      return newExercise;
    } catch (error) {
      this.eventBus.publish(new ErrorsEvent('CreateExerciseHandler', error));
      throw error;
    }
  }
}
