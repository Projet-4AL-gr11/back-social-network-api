import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetStatusFriendshipQuery } from '../query/get-status-friendship.query';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendshipRequest } from '../../domain/entities/friendship-request.entity';
import { Repository } from 'typeorm';
import { Friendship } from '../../domain/entities/friendship.entity';
import { FriendshipStatus } from '../../domain/enum/friendship-status.enum';

@QueryHandler(GetStatusFriendshipQuery)
export class GetStatusFriendshipHandler
  implements IQueryHandler<GetStatusFriendshipQuery>
{
  constructor(
    @InjectRepository(FriendshipRequest)
    private friendshipRequestRepository: Repository<FriendshipRequest>,
    @InjectRepository(Friendship)
    private friendshipRepository: Repository<Friendship>,
  ) {}

  async execute(query: GetStatusFriendshipQuery): Promise<FriendshipStatus> {
    if (
      (await this.friendshipRepository
        .createQueryBuilder()
        .leftJoinAndSelect('Friendship.friendOne', 'FriendOne')
        .leftJoinAndSelect('Friendship.friendTwo', 'FriendTwo')
        .where('(FriendOne.id=:currentUser AND FriendTwo.id=:id)', {
          currentUser: query.currentUser.id,
          userId: query.user,
        })
        .orWhere('(FriendOne.id=:userId AND FriendTwo.id=:currentUser)', {
          currentUser: query.currentUser.id,
          userId: query.user,
        })
        .getOne()) !== undefined
    ) {
      return FriendshipStatus.BEFRIENDED;
    } else if (
      (await this.friendshipRequestRepository
        .createQueryBuilder()
        .leftJoin('FriendRequest.sender', 'Sender')
        .leftJoin('FriendRequest.user', 'User')
        .where('Sender.id=:currentUser and User.id=:userId', {
          currentUser: query.currentUser.id,
          userId: query.user,
        })
        .getOne()) !== undefined
    ) {
      return FriendshipStatus.PENDING;
    } else if (
      (await this.friendshipRequestRepository
        .createQueryBuilder()
        .leftJoin('FriendRequest.sender', 'Sender')
        .leftJoin('FriendRequest.user', 'User')
        .where('Sender.id=:userId and User.id=:currentUser', {
          currentUser: query.currentUser.id,
          userId: query.user,
        })
        .getOne()) !== undefined
    ) {
      return FriendshipStatus.RECEIVED;
    }
    return FriendshipStatus.NONE;
  }
}
