//TODO: get-reported-event.handler.ts

import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Report } from "../../../domain/entities/report.entity";
import { Repository } from "typeorm";
import { GetReportedEventQuery } from "../../query/get-reported-event.query";

@QueryHandler(GetReportedEventQuery)
export class GetReportedEventHandler
  implements IQueryHandler<GetReportedEventQuery>
{
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
  ) {}

  execute(query: GetReportedEventQuery): Promise<any> {
    throw 'not implemented';
  }
}
