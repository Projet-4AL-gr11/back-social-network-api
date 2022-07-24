import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetReportQuery } from '../../query/get-report.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from '../../../domain/entities/report.entity';
import { Repository } from 'typeorm';
import { GetCountReportQuery } from '../../query/get-count-report.query';

@QueryHandler(GetCountReportQuery)
export class GetCountReportHandler
  implements IQueryHandler<GetCountReportQuery>
{
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
  ) {}

  async execute(query: GetCountReportQuery) {
    if (query.report.reportedGroup) {
      return this.reportRepository
        .createQueryBuilder()
        .leftJoinAndSelect('Report.reportedGroup', 'ReportedGroup')
        .where('ReportedGroup.id =:id', { id: query.report.reportedGroup.id })
        .getCount();
    } else if (query.report.reportedPost) {
      return this.reportRepository
        .createQueryBuilder()
        .leftJoinAndSelect('Report.reportedPost', 'ReportedPost')
        .where('ReportedPost.id =:id', { id: query.report.reportedPost.id })
        .getCount();
    } else if (query.report.reportedUser) {
      return this.reportRepository
        .createQueryBuilder()
        .leftJoinAndSelect('Report.reportedUser', 'ReportedUser')
        .where('ReportedUser.id =:id', { id: query.report.reportedUser.id })
        .getCount();
    } else if (query.report.reportedEvent) {
      return this.reportRepository
        .createQueryBuilder()
        .leftJoinAndSelect('Report.reportedEvent', 'ReportedEvent')
        .where('ReportedEvent.id =:id', { id: query.report.reportedEvent.id })
        .getCount();
    } else if (query.report.reportedComment) {
      return this.reportRepository
        .createQueryBuilder()
        .leftJoinAndSelect('Report.reportedComment', 'ReportedComment')
        .where('ReportedComment.id =:id', {
          id: query.report.reportedComment.id,
        })
        .getCount();
    } else if (query.report.reportedExercise) {
      return this.reportRepository
        .createQueryBuilder()
        .leftJoinAndSelect('Report.reportedExercise', 'ReportedExercise')
        .where('ReportedExercise.id =:id', {
          id: query.report.reportedExercise.id,
        })
        .getCount();
    }
  }
}
