import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../../../domain/entities/post.entity';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { DislikePostCommand } from '../../command/dislike-post.command';
import { DislikePostEvent } from '../../event/dislike-post.event';

@CommandHandler(DislikePostCommand)
export class DislikePostHandler implements ICommandHandler<DislikePostCommand> {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private eventBus: EventBus,
  ) {}

  async execute(command: DislikePostCommand): Promise<void> {
    try {
      await this.postRepository
        .createQueryBuilder()
        .relation('likes')
        .of(command.postId)
        .remove(command.userId);
      this.eventBus.publish(
        new DislikePostEvent(command.userId, command.postId),
      );
    } catch (error) {
      this.eventBus.publish(new ErrorsEvent('DislikePostHandler', error));
      throw error;
    }
  }
}
