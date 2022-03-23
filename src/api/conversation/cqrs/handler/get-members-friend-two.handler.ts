import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { User } from '../../../user/domain/entities/user.entity';
import { GetMembersFriendTwoQuery } from '../query/get-members-friend-two.query';

@QueryHandler(GetMembersFriendTwoQuery)
export class GetMembersFriendTwoHandler
  implements IQueryHandler<GetMembersFriendTwoQuery>
{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(query: GetMembersFriendTwoQuery): Promise<User[]> {
    return await getRepository(User)
      .createQueryBuilder()
      .leftJoin('User.friendsTwo', 'Friendship')
      .leftJoin('Friendship.conversation', 'Conversation')
      .where('Conversation.id=:conversationId', {
        conversationId: query.conversationId,
      })
      .getMany();
  }
}
