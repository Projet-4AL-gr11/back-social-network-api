import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../domain/entities/user.entity';
import { Repository } from 'typeorm';
import { GetUserFriendsQuery } from '../../query/get-user-friends.query';

@QueryHandler(GetUserFriendsQuery)
export class GetUserFriendsHandler
  implements IQueryHandler<GetUserFriendsQuery>
{
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(query: GetUserFriendsQuery) {
    if (query.friendOne) {
      return this.userRepository
        .createQueryBuilder()
        .leftJoin('User.friendsTwo', 'FriendshipTwo')
        .leftJoin('FriendshipTwo.friendOne', 'FriendOne')
        .where('FriendOne.id=:id', { id: query.userId })
        .getMany();
    } else {
      return this.userRepository
        .createQueryBuilder()
        .leftJoin('User.friendsOne', 'FriendshipOne')
        .leftJoin('FriendshipOne.friendTwo', 'FriendTwo')
        .where('FriendTwo.id=:id', { id: query.userId })
        .getMany();
    }
  }
}
