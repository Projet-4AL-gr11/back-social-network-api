import { Report } from '../entities/report.entity';

export class ReportResponseDto {
  constructor(
    public readonly reports: Report[],
    public readonly count: number,
  ) {}
}
