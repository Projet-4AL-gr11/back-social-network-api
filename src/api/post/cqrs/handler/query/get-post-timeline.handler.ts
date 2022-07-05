import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../../../domain/entities/post.entity';
import { Repository } from 'typeorm';
import { GetPostTimelineQuery } from '../../query/get-post-timeline.query';

@QueryHandler(GetPostTimelineQuery)
export class GetPostTimelineHandler
  implements IQueryHandler<GetPostTimelineQuery>
{
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async execute(query: GetPostTimelineQuery): Promise<Post[]> {
    return await this.postRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Post.creator', 'User')
      .leftJoinAndSelect('Post.medias', 'Media')
      .leftJoinAndSelect('Post.sharedEvent', 'Event')
      .leftJoinAndSelect('User.profilePicture', 'ProfilePicture')
      .leftJoin('User.friendsOne', 'FriendshipOne')
      .leftJoin('FriendshipOne.friendTwo', 'FriendTwo')
      .leftJoin('User.friendsTwo', 'FriendshipTwo')
      .leftJoin('FriendshipTwo.friendOne', 'FriendOne')
      .leftJoinAndSelect('Post.group', 'Group')
      .leftJoinAndSelect('Group.picture', 'groupPicture')
      .leftJoin('Group.followers', 'Follower')
      .leftJoin('Group.members', 'GroupMembership')
      .leftJoin('GroupMembership.user', 'Member')
      .leftJoinAndSelect('Post.comments', 'Comment')
      .leftJoinAndSelect('Post.sharedPosts', 'SharedPost')
      .where('User.id=:userId', { userId: query.userId })
      .orWhere('FriendTwo.id=:userId', { userId: query.userId })
      .orWhere('FriendOne.id=:userId', { userId: query.userId })
      .orWhere('Follower.id=:userId', { userId: query.userId })
      .orWhere('Member.id=:userId', { userId: query.userId })
      .orderBy('Post.createdAt', 'DESC')
      .skip(query.offset)
      .take(query.limit)
      .getMany();
  }
}
