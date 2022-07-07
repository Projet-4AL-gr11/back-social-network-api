import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../../../domain/entities/post.entity';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { LikePostCommand } from '../../command/like-post.command';
import { LikePostEvent } from '../../event/like-post.event';

@CommandHandler(LikePostCommand)
export class LikePostHandler implements ICommandHandler<LikePostCommand> {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private eventBus: EventBus,
  ) {}

  async execute(command: LikePostCommand): Promise<void> {
    try {
      await this.postRepository
        .createQueryBuilder()
        .relation('likes')
        .of(command.postId)
        .add(command.userId);
      this.eventBus.publish(new LikePostEvent(command.userId, command.postId));
    } catch (error) {
      // TODO: Renvoyer une vrai erreur
      this.eventBus.publish(new ErrorsEvent('LikePostHandler', error));
      throw error;
    }
  }
}
