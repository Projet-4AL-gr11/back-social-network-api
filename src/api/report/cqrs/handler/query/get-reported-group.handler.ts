//TODO: get-reported-post.handler.ts

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from '../../../domain/entities/report.entity';
import { Repository } from 'typeorm';
import { GetReportedGroupQuery } from '../../query/get-reported-group.query';

@QueryHandler(GetReportedGroupQuery)
export class GetReportedGroupHandler
  implements IQueryHandler<GetReportedGroupQuery>
{
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
  ) {}

  execute(query: GetReportedGroupQuery): Promise<any> {
    if (query.id) {
      return this.reportRepository
        .createQueryBuilder()
        .leftJoinAndSelect('ReportedGroup', 'Group')
        .where('Group.id=:id', { id: query.id })
        .getMany();
    }
    return this.reportRepository
      .createQueryBuilder()
      .leftJoinAndSelect('ReportedGroup', 'Group')
      .where('Group != null')
      .getMany();
  }
}
