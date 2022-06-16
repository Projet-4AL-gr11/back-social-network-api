import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './domain/entities/post.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { User } from '../user/domain/entities/user.entity';
import { CreatePostHandler } from './cqrs/handler/command/create-post.handler';
import { DeletePostHandler } from './cqrs/handler/command/delete-post.handler';
import { DislikePostHandler } from './cqrs/handler/command/dislike-post.handler';
import { LikePostHandler } from './cqrs/handler/command/like-post.handler';
import { UpdatePostHandler } from './cqrs/handler/command/update-post.handler';
import { GetLikeOfPostHandler } from './cqrs/handler/query/get-like-of-post.handler';
import { GetPostTimelineHandler } from './cqrs/handler/query/get-post-timeline.handler';
import { GetPostHandler } from './cqrs/handler/query/get-post.handler';
import { GetSharedPostHandler } from './cqrs/handler/query/get-shared-post.handler';
import { IsLikedPostHandler } from './cqrs/handler/query/is-liked-post.handler';
import { IsPostOwnerHandler } from './cqrs/handler/query/is-post-owner.handler';
import { GetGroupPostHandler } from './cqrs/handler/query/get-group-post.handler';
import { GetGroupHandler } from '../group/cqrs/handler/query/get-group.handler';
import { Group } from '../group/domain/entities/group.entity';
import { GetUserPostsHandler } from './cqrs/handler/query/get-user-posts.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Group]), CqrsModule],
  controllers: [PostController],
  providers: [
    PostService,
    CreatePostHandler,
    DeletePostHandler,
    DislikePostHandler,
    LikePostHandler,
    UpdatePostHandler,
    GetLikeOfPostHandler,
    GetPostHandler,
    GetPostTimelineHandler,
    GetSharedPostHandler,
    IsLikedPostHandler,
    IsPostOwnerHandler,
    GetGroupPostHandler,
    GetUserPostsHandler,
  ],
})
export class PostModule {}
