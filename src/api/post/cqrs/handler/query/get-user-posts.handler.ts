import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../../../domain/entities/post.entity';
import { Repository } from 'typeorm';
import { GetUserPostsQuery } from '../../query/get-user-posts.query';

@QueryHandler(GetUserPostsQuery)
export class GetUserPostsHandler implements IQueryHandler<GetUserPostsQuery> {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async execute(query: GetUserPostsQuery) {
    return await this.postRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Post.creator', 'User')
      .leftJoinAndSelect('Post.medias', 'Media')
      .leftJoinAndSelect('Post.sharesPost', 'SharedPost')
      .leftJoinAndSelect('Post.sharedEvent', 'SharedEvent')
      .leftJoinAndSelect('User.profilePicture', 'ProfilePicture')
      .where('User.id=:id', { id: query.userId })
      .orderBy('Post.createdAt', 'DESC')
      .limit(query.limit)
      .offset(query.offset)
      .getMany();
  }
}
