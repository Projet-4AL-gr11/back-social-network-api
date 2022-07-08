import { User } from '../../../user/domain/entities/user.entity';
import { Event } from '../../../event/domain/entities/event.entity';
import { Group } from '../../../group/domain/entities/group.entity';
import { Post } from '../../../post/domain/entities/post.entity';

export class SearchResponseDto {
  constructor(
    public users: User[],
    public events: Event[],
    public groups: Group[],
    public posts: Post[],
  ) {}
}
