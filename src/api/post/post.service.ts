import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PostDto } from './domain/dto/post.dto';
import { Post } from './domain/entities/post.entity';
import { CreatePostCommand } from './cqrs/command/create-post.command';
import { GetUserQuery } from '../user/cqrs/query/get-user.query';
import { GetPostQuery } from './cqrs/query/get-post.query';
import { DeletePostCommand } from './cqrs/command/delete-post.command';
import { UpdatePostCommand } from './cqrs/command/update-post.command';
import { User } from '../user/domain/entities/user.entity';
import { GetLikeOfPostQuery } from './cqrs/query/get-like-of-post.query';
import { IsLikedPostQuery } from './cqrs/query/is-liked-post.query';
import { LikePostCommand } from './cqrs/command/like-post.command';
import { DislikePostCommand } from './cqrs/command/dislike-post.command';
import { promises } from 'dns';
import { IsPostOwnerQuery } from './cqrs/query/is-post-owner.query';
import { GetSharedPostQuery } from './cqrs/query/get-shared-post.query';
import { GetPostTimelineQuery } from './cqrs/query/get-post-timeline.query';
import { GetGroupQuery } from '../group/cqrs/query/get-group.query';

@Injectable()
export class PostService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  async createPost(
    userId: string,
    postDto: PostDto,
    groupId?: string,
  ): Promise<Post> {
    let post: Post;

    const user = await this.queryBus.execute(new GetUserQuery(userId));

    if (postDto.group) {
      const group = await this.queryBus.execute(new GetGroupQuery(groupId));
      post = await this.commandBus.execute(
        new CreatePostCommand(user, postDto, group),
      );
    } else {
      post = await this.commandBus.execute(
        new CreatePostCommand(user, postDto),
      );
    }
    return post;
  }

  async getById(postId: string): Promise<Post> {
    return await this.queryBus.execute(new GetPostQuery(postId));
  }

  async getAll(): Promise<Post> {
    return await this.queryBus.execute(new GetPostQuery());
  }

  async delete(postId: string): Promise<void> {
    return await this.commandBus.execute(new DeletePostCommand(postId));
  }

  async update(postId: string, postDto: PostDto): Promise<Post> {
    await this.commandBus.execute(new UpdatePostCommand(postId, postDto));
    return await this.getById(postId);
  }

  async getLikes(postId: string): Promise<User[]> {
    return await this.queryBus.execute(new GetLikeOfPostQuery(postId));
  }

  async isLiked(userId: string, postId: string): Promise<boolean> {
    return await this.queryBus.execute(new IsLikedPostQuery(postId, userId));
  }

  async likePost(userId: string, postId: string): Promise<void> {
    return await this.commandBus.execute(new LikePostCommand(postId, userId));
  }

  async dislikePost(userId: string, postId: string): Promise<void> {
    return await this.commandBus.execute(
      new DislikePostCommand(postId, userId),
    );
  }

  async isPostOwner(userId: string, postId: string): Promise<boolean> {
    return await this.queryBus.execute(new IsPostOwnerQuery(postId, userId));
  }

  async getSharedPost(postId: string): Promise<Post> {
    return await this.queryBus.execute(new GetSharedPostQuery(postId));
  }

  async getTimeLine(
    userId: string,
    offset: number,
    limit: number,
  ): Promise<Post> {
    return await this.queryBus.execute(
      new GetPostTimelineQuery(userId, offset, limit),
    );
  }
}
