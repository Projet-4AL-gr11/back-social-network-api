import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from '../../../domain/entities/report.entity';
import { Repository } from 'typeorm';
import { GetReportedExerciseQuery } from '../../query/get-reported-exercise.query';

@QueryHandler(GetReportedExerciseQuery)
export class GetReportedExerciseHandler
  implements IQueryHandler<GetReportedExerciseQuery>
{
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
  ) {}

  execute(query: GetReportedExerciseQuery): Promise<any> {
    if (query.exerciseId) {
      return this.reportRepository
        .createQueryBuilder()
        .leftJoinAndSelect('Report.userReporter', 'Reporter')
        .leftJoinAndSelect('ReportedExercise', 'Exercise')
        .where('Exercise.id=:id', { id: query.exerciseId })
        .getMany();
    }
    return this.reportRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Report.userReporter', 'Reporter')
      .leftJoinAndSelect('Report.reportedExercise', 'Exercise')
      .where('Report.reportedExerciseId IS NOT NULL')
      .getMany();
  }
}
