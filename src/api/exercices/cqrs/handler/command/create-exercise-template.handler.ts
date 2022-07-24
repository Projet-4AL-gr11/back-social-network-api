import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { CreateExerciseTemplateCommand } from '../../command/create-exercise-template.command';
import { ExerciseTemplate } from '../../../domain/entities/exercise-template.entity';
import { CreateExerciseTemplateEvent } from '../../event/create-exercise-template.event';

@CommandHandler(CreateExerciseTemplateCommand)
export class CreateExerciseTemplateHandler
  implements ICommandHandler<CreateExerciseTemplateCommand>
{
  constructor(
    @InjectRepository(ExerciseTemplate)
    private exerciseTemplateRepository: Repository<ExerciseTemplate>,
    private eventBus: EventBus,
  ) {}

  async execute(
    command: CreateExerciseTemplateCommand,
  ): Promise<ExerciseTemplate> {
    try {
      const exerciseTemplate = await this.exerciseTemplateRepository.create({
        code: command.code,
        description: command.description,
        language: command.language,
        name: command.name,
      });
      const err = await validate(exerciseTemplate, {
        validationError: { target: false },
      });
      if (err.length > 0) {
        throw err;
      }
      const newExerciseTemplate = await this.exerciseTemplateRepository.save(
        exerciseTemplate,
      );
      this.eventBus.publish(
        new CreateExerciseTemplateEvent(newExerciseTemplate.id),
      );
      return newExerciseTemplate;
    } catch (error) {
      // TODO: retourné une vrai erreur
      this.eventBus.publish(
        new ErrorsEvent('CreateExerciseTemplateHandler', error),
      );
      throw error;
    }
  }
}
