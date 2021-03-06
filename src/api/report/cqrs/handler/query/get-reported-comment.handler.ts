import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from '../../../domain/entities/report.entity';
import { Repository } from 'typeorm';
import { GetReportedCommentQuery } from '../../query/get-reported-comment.query';

@QueryHandler(GetReportedCommentQuery)
export class GetReportedCommentHandler
  implements IQueryHandler<GetReportedCommentQuery>
{
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
  ) {}

  execute(query: GetReportedCommentQuery): Promise<Report[]> {
    if (query.id) {
      return this.reportRepository
        .createQueryBuilder()
        .leftJoinAndSelect('Report.userReporter', 'Reporter')
        .leftJoinAndSelect('Report.reportedComment', 'Comment')
        .leftJoinAndSelect('Comment.post', 'Post')
        .leftJoinAndSelect('Comment.creator', 'User')
        .where('Comment.id=:id', { id: query.id })
        .getMany();
    }
    return this.reportRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Report.userReporter', 'Reporter')
      .leftJoinAndSelect('Report.reportedComment', 'Comment')
      .leftJoinAndSelect('Comment.post', 'Post')
      .leftJoinAndSelect('Comment.creator', 'User')
      .where('Report.reportedCommentId IS NOT NULL')
      .getMany();
  }
}
