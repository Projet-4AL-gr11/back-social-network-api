import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { ResearchFriendsQuery } from '../../query/research-friends.query';
import { Friendship } from '../../../domain/entities/friendship.entity';

@QueryHandler(ResearchFriendsQuery)
export class ResearchFriendsHandler
  implements IQueryHandler<ResearchFriendsQuery>
{
  constructor(
    @InjectRepository(Friendship)
    private friendshipRepository: Repository<Friendship>,
  ) {}

  async execute(query: ResearchFriendsQuery) {
    return this.friendshipRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Friendship.friendOne', 'FriendOne')
      .leftJoinAndSelect('Friendship.friendTwo', 'FriendTwo')
      .where(
        new Brackets((qb) => {
          qb.where('FriendOne.id=:currentUser ', {
            currentUser: query.userId,
          }).orWhere('FriendTwo.id=:currentUser', {
            currentUser: query.userId,
          });
        }),
      )
      .andWhere(
        new Brackets((qb) => {
          qb.where('FriendTwo.username like :data', {
            data: query.name,
          }).orWhere('FriendOne.username like :data', { data: query.name });
        }),
      )
      .getMany();
  }
}
