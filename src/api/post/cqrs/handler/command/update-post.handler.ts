import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../../../domain/entities/post.entity';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { UpdatePostCommand } from '../../command/update-post.command';
import { UpdatePostEvent } from '../../event/update-post.event';

@CommandHandler(UpdatePostCommand)
export class UpdatePostHandler implements ICommandHandler<UpdatePostCommand> {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private eventBus: EventBus,
  ) {}

  async execute(command: UpdatePostCommand): Promise<void> {
    try {
      await this.postRepository.update(command.postId, command.postDto);
      this.eventBus.publish(new UpdatePostEvent(command.postId));
    } catch (error) {
      // TODO: Renvoyer une vrai erreur
      this.eventBus.publish(new ErrorsEvent('UpdatePostHandler', error));
      throw error;
    }
  }
}
