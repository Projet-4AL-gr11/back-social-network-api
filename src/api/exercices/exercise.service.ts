import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetExerciseQuery } from './cqrs/query/get-exercise.query';
import { GetEventExercisesQuery } from './cqrs/query/get-event-exercises.query';
import { GetExerciseTemplateWithExerciseIdQuery } from './cqrs/query/get-exercise-template-with-exercise-id.query';

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
}
