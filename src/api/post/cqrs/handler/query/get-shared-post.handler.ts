import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetSharedPostQuery } from '../../query/get-shared-post.query';
import { Post } from '../../../domain/entities/post.entity';

@QueryHandler(GetSharedPostQuery)
export class GetSharedPostHandler implements IQueryHandler<GetSharedPostQuery> {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async execute(query: GetSharedPostQuery): Promise<Post> {
    return this.postRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Post.creator', 'Creator')
      .leftJoinAndSelect('Creator.certification', 'Certification')
      .leftJoinAndSelect('Creator.profilePicture', 'ProfPic')
      .leftJoin('Post.sharedPosts', 'Shares')
      .where('Shares.id=:postId', { postId: query.postId })
      .getOne();
  }
}
