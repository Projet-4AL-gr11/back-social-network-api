import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetExerciseQuery } from '../../query/get-exercise.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercise } from '../../../domain/entities/exercise.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetExerciseQuery)
export class GetExerciseHandler implements IQueryHandler<GetExerciseQuery> {
  constructor(
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
  ) {}

  async execute(query: GetExerciseQuery): Promise<Exercise> {
    return await this.exerciseRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Exercise.exerciseTemplate', 'ExerciseTemplate')
      .leftJoinAndSelect('Exercise.event', 'Event')
      .leftJoinAndSelect('ExerciseTemplate.language', 'Language')
      .where('Exercise.id =:id', { id: query.id })
      .getOne();
  }
}
