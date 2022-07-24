import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetExerciseQuery } from './cqrs/query/get-exercise.query';
import { GetEventExercisesQuery } from './cqrs/query/get-event-exercises.query';
import { GetExerciseTemplateWithExerciseIdQuery } from './cqrs/query/get-exercise-template-with-exercise-id.query';
import { GetExerciseTemplateQuery } from './cqrs/query/get-exercise-template.query';
import { ExerciseTemplateDto } from './domain/dto/exercise-template.dto';
import { GetLanguageQuery } from '../language/cqrs/query/get-language.query';
import { CreateExerciseTemplateCommand } from './cqrs/command/create-exercise-template.command';
import { UpdateExerciseTemplateCommand } from './cqrs/command/update-exercise-template.command';
import { RemoveExerciseTemplateCommand } from './cqrs/command/remove-exercise-template.command';

@Injectable()
export class ExerciseService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  async getById(id: string) {
    return this.queryBus.execute(new GetExerciseQuery(id));
  }

  async getEventExercise(id: string) {
    return this.queryBus.execute(new GetEventExercisesQuery(id));
  }

  async getExerciseTemplateWithExerciseId(id: string) {
    return this.queryBus.execute(
      new GetExerciseTemplateWithExerciseIdQuery(id),
    );
  }

  async getAllExerciseTemplate() {
    return this.queryBus.execute(new GetExerciseTemplateQuery());
  }

  async getExerciseTemplateById(id: string) {
    return this.queryBus.execute(new GetExerciseTemplateQuery(id));
  }

  async createExerciseTemplate(createExerciseTemplateDto: ExerciseTemplateDto) {
    const language = await this.queryBus.execute(
      new GetLanguageQuery(createExerciseTemplateDto.language),
    );
    return this.commandBus.execute(
      new CreateExerciseTemplateCommand(
        createExerciseTemplateDto.name,
        createExerciseTemplateDto.description,
        language,
        createExerciseTemplateDto.code,
      ),
    );
  }

  async updateExerciseTemplate(updateExerciseTemplateDto: ExerciseTemplateDto) {
    const language = await this.queryBus.execute(
      new GetLanguageQuery(updateExerciseTemplateDto.language),
    );
    return this.commandBus.execute(
      new UpdateExerciseTemplateCommand(
        updateExerciseTemplateDto.id,
        updateExerciseTemplateDto.name,
        updateExerciseTemplateDto.description,
        language,
        updateExerciseTemplateDto.code,
      ),
    );
  }

  deleteExerciseTemplate(id: string) {
    return this.commandBus.execute(new RemoveExerciseTemplateCommand(id));
  }
}
