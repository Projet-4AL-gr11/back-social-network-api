import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Comment } from "./domain/entities/comment.entity";
import { GetCommentQuery } from "./cqrs/query/get-comment.query";
import { GetUserQuery } from "../user/cqrs/query/get-user.query";
import { GetPostQuery } from "../post/cqrs/query/get-post.query";
import { AddCommentCommand } from "./cqrs/command/add-comment.command";
import { UpdateCommentCommand } from "./cqrs/command/update-comment.command";
import { DeleteCommentCommand } from "./cqrs/command/delete-comment.command";
import { GetCommentsWithPostIdQuery } from "./cqrs/query/get-comments-with-post-id.query";

@Injectable()
export class CommentService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  async getById(commentId: string): Promise<Comment> {
    return await this.commandBus.execute(new GetCommentQuery(commentId));
  }

  async create(userId: string, postId: string, text: string): Promise<Comment> {
    const user = await this.queryBus.execute(new GetUserQuery(userId));
    const post = await this.queryBus.execute(new GetPostQuery(postId));
    return await this.commandBus.execute(
      new AddCommentCommand(post, user, text),
    );
  }

  async update(commentId: string, text: string): Promise<Comment> {
    return await this.commandBus.execute(
      new UpdateCommentCommand(commentId, text),
    );
  }

  async delete(commentId: string): Promise<void> {
    return await this.commandBus.execute(new DeleteCommentCommand(commentId));
  }

  async getCommentWithPostId(postId: string): Promise<Comment[]> {
    return await this.queryBus.execute(
      new GetCommentsWithPostIdQuery(postId),
    );
  }
}
