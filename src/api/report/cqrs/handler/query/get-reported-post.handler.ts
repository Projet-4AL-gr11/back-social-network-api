//TODO: get-reported-post.handler.ts

import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Report } from "../../../domain/entities/report.entity";
import { Repository } from "typeorm";
import { GetReportedPostQuery } from "../../query/get-reported-post.query";

@QueryHandler(GetReportedPostQuery)
export class GetReportedPostHandler
  implements IQueryHandler<GetReportedPostQuery>
{
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
  ) {}

  execute(query: GetReportedPostQuery): Promise<any> {
    if (query.id) {
      return this.reportRepository
          .createQueryBuilder()
          .leftJoinAndSelect('ReportedPost', 'Post')
          .where('Post.id=:id', {id: query.id})
          .getMany()
    }
    return this.reportRepository
        .createQueryBuilder()
        .leftJoinAndSelect('ReportedPost', 'Post')
        .where('Post != null')
        .getMany();
  }
}
