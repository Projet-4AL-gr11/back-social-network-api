import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetReceivedFriendshipRequestQuery } from '../../query/get-received-friendship-request.query';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendshipRequest } from '../../../domain/entities/friendship-request.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetReceivedFriendshipRequestQuery)
export class GetReceivedFriendshipHandler
  implements IQueryHandler<GetReceivedFriendshipRequestQuery>
{
  constructor(
    @InjectRepository(FriendshipRequest)
    private friendshipRequestRepository: Repository<FriendshipRequest>,
  ) {}

  async execute(query: GetReceivedFriendshipRequestQuery) {
    return this.friendshipRequestRepository
      .createQueryBuilder()
      .leftJoin('FriendshipRequest.user', 'User')
      .leftJoinAndSelect('FriendshipRequest.sender', 'Sender')
      .where('User.id=:id', { id: query.userId })
      .getMany();
  }
}
