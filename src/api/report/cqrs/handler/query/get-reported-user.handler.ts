//TODO: get-reported-user.handler.ts

import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Report } from "../../../domain/entities/report.entity";
import { Repository } from "typeorm";
import { GetReportedUserQuery } from "../../query/get-reported-user.query";

@QueryHandler(GetReportedUserQuery)
export class GetReportedUserHandler
  implements IQueryHandler<GetReportedUserQuery>
{
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
  ) {}

  execute(query: GetReportedUserQuery): Promise<any> {
    if (query.id) {
      return this.reportRepository
          .createQueryBuilder()
          .leftJoinAndSelect('ReportedUser', 'User')
          .where('User.id=:id', {id: query.id})
          .getMany()
    }
    return this.reportRepository
        .createQueryBuilder()
        .leftJoinAndSelect('ReportedUser', 'User')
        .where('User != null')
        .getMany();
  }
}
