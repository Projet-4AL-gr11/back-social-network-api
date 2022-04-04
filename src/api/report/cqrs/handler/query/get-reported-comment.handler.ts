//TODO: get-reported-comment.handler.ts

import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Report } from "../../../domain/entities/report.entity";
import { Repository } from "typeorm";
import { GetReportedCommentQuery } from "../../query/get-reported-comment.query";

@QueryHandler(GetReportedCommentQuery)
export class GetReportedCommentHandler
  implements IQueryHandler<GetReportedCommentQuery>
{
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
  ) {}

  execute(query: GetReportedCommentQuery): Promise<any> {
    throw 'not implemented';
  }
}
