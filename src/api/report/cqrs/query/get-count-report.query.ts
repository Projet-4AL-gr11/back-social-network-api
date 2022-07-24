import { Report } from '../../domain/entities/report.entity';

export class GetCountReportQuery {
  constructor(public readonly report: Report) {}
}
