import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetReportQuery } from '../../query/get-report.query';
import { Report } from '../../../domain/entities/report.entity';

@QueryHandler(GetReportQuery)
export class GetReportHandler implements IQueryHandler<GetReportQuery> {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
  ) {}

  async execute(query: GetReportQuery) {
    if (query.id) {
      return await this.reportRepository.findOne(query.id);
    }
    return await this.reportRepository.find();
  }
}
