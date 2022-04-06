import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/domain/entities/user.entity';
import { Comment } from '../comment/domain/entities/comment.entity';
import { Event } from '../event/domain/entities/event.entity';
import { Group } from '../group/domain/entities/group.entity';
import { Report } from './domain/entities/report.entity';
import { Post } from '../post/domain/entities/post.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { CreateReportCommentHandler } from './cqrs/handler/command/create-report-comment.handler';
import { CreateReportEventHandler } from './cqrs/handler/command/create-report-event.handler';
import { CreateReportGroupHandler } from './cqrs/handler/command/create-report-group.handler';
import { CreateReportPostHandler } from './cqrs/handler/command/create-report-post.handler';
import { CreateReportUserHandler } from './cqrs/handler/command/create-report-user.handler';
import { DeleteReportHandler } from './cqrs/handler/command/delete-report.handler';
import { GetReportHandler } from './cqrs/handler/query/get-report.handler';
import { GetReportedCommentQuery } from './cqrs/query/get-reported-comment.query';
import { GetReportedGroupHandler } from './cqrs/handler/query/get-reported-group.handler';
import { GetReportedPostHandler } from './cqrs/handler/query/get-reported-post.handler';
import { GetReportedUserHandler } from './cqrs/handler/query/get-reported-user.handler';
import { GetReportedEventHandler } from './cqrs/handler/query/get-reported-event.handler';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report, User, Comment, Event, Group, Post]),
    CqrsModule,
  ],
  controllers: [ReportController],
  providers: [
    ReportService,
    CreateReportCommentHandler,
    CreateReportEventHandler,
    CreateReportGroupHandler,
    CreateReportPostHandler,
    CreateReportUserHandler,
    DeleteReportHandler,
    GetReportHandler,
    GetReportedCommentQuery,
    GetReportedEventHandler,
    GetReportedGroupHandler,
    GetReportedPostHandler,
    GetReportedUserHandler,
  ],
})
export class ReportModule {}
