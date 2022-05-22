import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../../../domain/entities/comment.entity';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { UpdateCommentCommand } from '../../command/update-comment.command';
import { UpdateCommentEvent } from '../../event/update-comment.event';

@CommandHandler(UpdateCommentCommand)
export class UpdateCommentHandler
  implements ICommandHandler<UpdateCommentCommand>
{
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private eventBus: EventBus,
  ) {}

  async execute(command: UpdateCommentCommand): Promise<void> {
    try {
      await this.commentRepository.delete(command.commentId);
      this.eventBus.publish(new UpdateCommentEvent(command.commentId));
    } catch (error) {
      this.eventBus.publish(new ErrorsEvent('UpdateCommentCommand', error));
      throw error;
    }
  }
}
