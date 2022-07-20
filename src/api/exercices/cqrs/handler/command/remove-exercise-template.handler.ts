import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ExerciseTemplate } from '../../../domain/entities/exercise-template.entity';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { RemoveExerciseTemplateCommand } from '../../command/remove-exercise-template.command';
import { RemoveExerciseTemplateEvent } from '../../event/remove-exercise-template.event';

@CommandHandler(RemoveExerciseTemplateCommand)
export class RemoveExerciseTemplateHandler
  implements ICommandHandler<RemoveExerciseTemplateCommand>
{
  constructor(
    @InjectRepository(ExerciseTemplate)
    private exerciseTemplateRepository: Repository<ExerciseTemplate>,
    private eventBus: EventBus,
  ) {}

  async execute(command: RemoveExerciseTemplateCommand): Promise<any> {
    try {
      const exerciseTemplate = await this.exerciseTemplateRepository.delete(
        command.id,
      );
      this.eventBus.publish(new RemoveExerciseTemplateEvent(command.id));
      return exerciseTemplate;
    } catch (error) {
      // TODO: retourné une vrai erreur
      this.eventBus.publish(
        new ErrorsEvent('RemoveExerciseTemplateHandler', error),
      );
      throw error;
    }
  }
}
