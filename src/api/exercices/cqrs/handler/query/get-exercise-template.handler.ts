import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetExerciseQuery } from '../../query/get-exercise.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercise } from '../../../domain/entities/exercise.entity';
import { Repository } from 'typeorm';
import { GetExerciseTemplateQuery } from '../../query/get-exercise-template.query';
import { ExerciseTemplate } from '../../../domain/entities/exercise-template.entity';

@QueryHandler(GetExerciseTemplateQuery)
export class GetExerciseTemplateHandler
  implements IQueryHandler<GetExerciseTemplateQuery>
{
  constructor(
    @InjectRepository(ExerciseTemplate)
    private exerciseRepository: Repository<ExerciseTemplate>,
  ) {}

  async execute(query: GetExerciseTemplateQuery): Promise<any> {
    if (query.exerciseTemplateId) {
      return this.exerciseRepository.findOne(query.exerciseTemplateId);
    }
    return this.exerciseRepository.find();
  }
}
