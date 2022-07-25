import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UpdateExerciseTemplateEvent } from '../../event/update-exercise-template.event';
import { InjectRepository } from '@nestjs/typeorm';
import { ExerciseTemplate } from '../../../domain/entities/exercise-template.entity';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { UpdateExerciseTemplateCommand } from '../../command/update-exercise-template.command';

@CommandHandler(UpdateExerciseTemplateCommand)
export class UpdateExerciseTemplateHandler
  implements ICommandHandler<UpdateExerciseTemplateCommand>
{
  constructor(
    @InjectRepository(ExerciseTemplate)
    private exerciseTemplateRepository: Repository<ExerciseTemplate>,
    private eventBus: EventBus,
  ) {}

  async execute(command: UpdateExerciseTemplateCommand): Promise<any> {
    try {
      const exerciseTemplate = await this.exerciseTemplateRepository.update(
        command.id,
        {
          code: command.code,
          description: command.description,
          language: command.language,
          name: command.name,
        },
      );
      this.eventBus.publish(new UpdateExerciseTemplateEvent(command.id));
      return exerciseTemplate;
    } catch (error) {
      this.eventBus.publish(
        new ErrorsEvent('UpdateExerciseTemplateHandler', error),
      );
      throw error;
    }
  }
}
