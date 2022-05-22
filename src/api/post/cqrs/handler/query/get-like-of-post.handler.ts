import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetLikeOfPostQuery } from '../../query/get-like-of-post.query';
import { User } from '../../../../user/domain/entities/user.entity';

@QueryHandler(GetLikeOfPostQuery)
export class GetLikeOfPostHandler implements IQueryHandler<GetLikeOfPostQuery> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(query: GetLikeOfPostQuery): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder()
      .leftJoin('User.likedPosts', 'Post')
      .where('Post.id=:postId', { postId: query.postId })
      .getMany();
  }
}
