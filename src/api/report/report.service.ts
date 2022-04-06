import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ReportRequestDto } from './domain/dto/report-request.dto';
import { Report } from './domain/entities/report.entity';
import { User } from '../user/domain/entities/user.entity';
import { GetUserQuery } from '../user/cqrs/query/get-user.query';
import { Comment } from '../comment/domain/entities/comment.entity';
import { GetCommentQuery } from '../comment/cqrs/query/get-comment.query';
import { CreateReportCommentCommand } from './cqrs/command/create-report-comment.command';
import { Event } from '../event/domain/entities/event.entity';
import { GetEventQuery } from '../event/cqrs/query/get-event.query';
import { CreateReportEventCommand } from './cqrs/command/create-report-event.command';
import { Group } from '../group/domain/entities/group.entity';
import { GetGroupQuery } from '../group/cqrs/query/get-group.query';
import { CreateReportGroupCommand } from './cqrs/command/create-report-group.command';
import { Post } from '../post/domain/entities/post.entity';
import { GetPostQuery } from '../post/cqrs/query/get-post.query';
import { CreateReportPostCommand } from './cqrs/command/create-report-post.command';
import { CreateReportUserCommand } from './cqrs/command/create-report-user.command';
import { DeleteReportCommand } from './cqrs/command/delete-report.command';
import { GetReportQuery } from './cqrs/query/get-report.query';
import { GetReportedCommentQuery } from './cqrs/query/get-reported-comment.query';
import { GetReportedEventQuery } from './cqrs/query/get-reported-event.query';
import { GetReportedGroupQuery } from './cqrs/query/get-reported-group.query';
import { GetReportedPostQuery } from './cqrs/query/get-reported-post.query';
import { GetReportedUserQuery } from './cqrs/query/get-reported-user.query';

@Injectable()
export class ReportService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  async deleteReport(reportId: string): Promise<void> {
    return await this.commandBus.execute(new DeleteReportCommand(reportId));
  }

  async createReportComment(reportRequest: ReportRequestDto): Promise<Report> {
    const creator: User = await this.queryBus.execute(
      new GetUserQuery(reportRequest.creatorId),
    );
    const comment: Comment = await this.queryBus.execute(
      new GetCommentQuery(reportRequest.commentId),
    );
    return await this.commandBus.execute(
      new CreateReportCommentCommand(creator, comment, reportRequest.text),
    );
  }

  async createReportEvent(reportRequest: ReportRequestDto): Promise<Report> {
    const creator: User = await this.queryBus.execute(
      new GetUserQuery(reportRequest.creatorId),
    );
    const event: Event = await this.queryBus.execute(
      new GetEventQuery(reportRequest.eventId),
    );
    return await this.commandBus.execute(
      new CreateReportEventCommand(creator, event, reportRequest.text),
    );
  }

  async createReportGroup(reportRequest: ReportRequestDto): Promise<Report> {
    const creator: User = await this.queryBus.execute(
      new GetUserQuery(reportRequest.creatorId),
    );
    const group: Group = await this.queryBus.execute(
      new GetGroupQuery(reportRequest.groupId),
    );
    return await this.commandBus.execute(
      new CreateReportGroupCommand(creator, group, reportRequest.text),
    );
  }

  async createReportPost(reportRequest: ReportRequestDto): Promise<Report> {
    const creator: User = await this.queryBus.execute(
      new GetUserQuery(reportRequest.creatorId),
    );
    const post: Post = await this.queryBus.execute(
      new GetPostQuery(reportRequest.postId),
    );
    return await this.commandBus.execute(
      new CreateReportPostCommand(creator, post, reportRequest.text),
    );
  }

  async createReportUser(reportRequest: ReportRequestDto): Promise<Report> {
    const creator: User = await this.queryBus.execute(
      new GetUserQuery(reportRequest.creatorId),
    );
    const user: User = await this.queryBus.execute(
      new GetUserQuery(reportRequest.userId),
    );
    return await this.commandBus.execute(
      new CreateReportUserCommand(creator, user, reportRequest.text),
    );
  }

  async getReports(): Promise<Report[]> {
    return await this.queryBus.execute(new GetReportQuery());
  }

  async getReportWithId(reportId: string): Promise<Report> {
    return await this.queryBus.execute(new GetReportQuery(reportId));
  }

  async getReportedComment(id: string): Promise<Report[]> {
    return await this.queryBus.execute(new GetReportedCommentQuery(id));
  }

  async getReportedComments(): Promise<Report[]> {
    return await this.queryBus.execute(new GetReportedCommentQuery());
  }

  async getReportedEvent(id: string): Promise<Report[]> {
    return await this.queryBus.execute(new GetReportedCommentQuery(id));
  }

  async getReportedEvents(): Promise<Report[]> {
    return await this.queryBus.execute(new GetReportedEventQuery());
  }

  async getReportedGroup(id: string): Promise<Report[]> {
    return await this.queryBus.execute(new GetReportedGroupQuery(id));
  }

  async getReportedGroups(): Promise<Report[]> {
    return await this.queryBus.execute(new GetReportedGroupQuery());
  }

  async getReportedPost(id: string): Promise<Report[]> {
    return await this.queryBus.execute(new GetReportedPostQuery(id));
  }

  async getReportedPosts(): Promise<Report[]> {
    return await this.queryBus.execute(new GetReportedPostQuery());
  }

  async getReportedUser(id: string): Promise<Report[]> {
    return await this.queryBus.execute(new GetReportedUserQuery(id));
  }

  async getReportedUsers(): Promise<Report[]> {
    return await this.queryBus.execute(new GetReportedUserQuery());
  }
}
