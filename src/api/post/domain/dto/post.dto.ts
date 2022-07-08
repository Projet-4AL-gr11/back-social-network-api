import { Group } from '../../../group/domain/entities/group.entity';
import { Post } from '../entities/post.entity';
import { Event } from '../../../event/domain/entities/event.entity';

export class PostDto {
  text: string;
  group?: Group;
  sharedEvent?: Event;
  sharesPost?: Post;
}
