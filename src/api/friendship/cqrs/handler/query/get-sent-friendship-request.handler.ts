import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSentFriendshipRequestQuery } from '../../query/get-sent-friendship-request.query';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendshipRequest } from '../../../domain/entities/friendship-request.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetSentFriendshipRequestQuery)
export class GetSentFriendshipRequestHandler
  implements IQueryHandler<GetSentFriendshipRequestQuery>
{
  constructor(
    @InjectRepository(FriendshipRequest)
    private friendshipRequestRepository: Repository<FriendshipRequest>,
  ) {}

  async execute(query: GetSentFriendshipRequestQuery) {
    return this.friendshipRequestRepository
      .createQueryBuilder()
      .leftJoin('FriendshipRequest.sender', 'Sender')
      .leftJoinAndSelect('FriendshipRequest.user', 'User')
      .where('Sender.id=:id', { id: query.userId })
      .getMany();
  }
}
