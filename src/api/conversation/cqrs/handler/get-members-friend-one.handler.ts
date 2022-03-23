import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { User } from '../../../user/domain/entities/user.entity';
import { GetMembersFriendOneQuery } from '../query/get-members-friend-one.query';

@QueryHandler(GetMembersFriendOneQuery)
export class GetMembersFriendOneHandler
  implements IQueryHandler<GetMembersFriendOneQuery>
{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(query: GetMembersFriendOneQuery): Promise<User[]> {
    return await getRepository(User)
      .createQueryBuilder()
      .leftJoin('User.friendsOne', 'Friendship')
      .leftJoin('Friendship.conversation', 'Conversation')
      .where('Conversation.id=:conversationId', { conversationId: query.conversationId })
      .getMany();
  }
}
