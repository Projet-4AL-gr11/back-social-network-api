import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../../../domain/entities/post.entity';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { DeletePostCommand } from '../../command/delete-post.command';
import { DeletePostEvent } from '../../event/delete-post.event';

@CommandHandler(DeletePostCommand)
export class DeletePostHandler implements ICommandHandler<DeletePostCommand> {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private eventBus: EventBus,
  ) {}

  async execute(command: DeletePostCommand): Promise<void> {
    try {
      await this.postRepository.delete(command.postId);
      this.eventBus.publish(new DeletePostEvent(command.postId));
    } catch (error) {
      this.eventBus.publish(new ErrorsEvent('DeletePostHandler', error));
      throw error;
    }
  }
}
