import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Comment } from './domain/entities/comment.entity';
import { User } from '../user/domain/entities/user.entity';
import { Post } from '../post/domain/entities/post.entity';
import { AddCommentHandler } from './cqrs/handler/command/add-comment.handler';
import { DeleteCommentHandler } from './cqrs/handler/command/delete-comment.handler';
import { UpdateCommentHandler } from './cqrs/handler/command/update-comment.handler';
import { GetCommentHandler } from './cqrs/handler/query/get-comment.handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Post, User]), CqrsModule],
  controllers: [CommentController],
  providers: [
    CommentService,
    AddCommentHandler,
    DeleteCommentHandler,
    UpdateCommentHandler,
    GetCommentHandler,
  ],
})
export class CommentModule {}
