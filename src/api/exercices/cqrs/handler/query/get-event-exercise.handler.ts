import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercise } from '../../../domain/entities/exercise.entity';
import { Repository } from 'typeorm';
import { GetEventExercisesQuery } from '../../query/get-event-exercises.query';

@QueryHandler(GetEventExercisesQuery)
export class GetEventExerciseHandler
  implements IQueryHandler<GetEventExercisesQuery>
{
  constructor(
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
  ) {}

  async execute(query: GetEventExercisesQuery): Promise<Exercise[]> {
    return await this.exerciseRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Exercise.event', 'Event')
      .leftJoinAndSelect('Exercise.exerciseTemplate', 'ExerciseTemplate')
      .where('Event.id=:id', { id: query.exerciseId })
      .getMany();
  }
}
