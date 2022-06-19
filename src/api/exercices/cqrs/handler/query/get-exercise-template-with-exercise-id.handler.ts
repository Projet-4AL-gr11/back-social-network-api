import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetExerciseQuery } from '../../query/get-exercise.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercise } from '../../../domain/entities/exercise.entity';
import { Repository } from 'typeorm';
import { GetExerciseTemplateWithExerciseIdQuery } from '../../query/get-exercise-template-with-exercise-id.query';
import { ExerciseTemplate } from '../../../domain/entities/exercise-template.entity';

@QueryHandler(GetExerciseTemplateWithExerciseIdQuery)
export class GetExerciseTemplateWithExerciseIdHandler
  implements IQueryHandler<GetExerciseTemplateWithExerciseIdQuery>
{
  constructor(
    @InjectRepository(ExerciseTemplate)
    private exerciseTemplateRepository: Repository<ExerciseTemplate>,
  ) {}

  async execute(
    query: GetExerciseTemplateWithExerciseIdQuery,
  ): Promise<ExerciseTemplate> {
    return await this.exerciseTemplateRepository
      .createQueryBuilder()
      .leftJoinAndSelect('ExerciseTemplate.exercises', 'Exercise')
      .where('Exercise.id=:id', { id: query.exerciseId })
      .getOne();
  }
}
