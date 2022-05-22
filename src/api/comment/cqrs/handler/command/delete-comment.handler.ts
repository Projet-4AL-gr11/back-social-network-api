import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { DeleteCommentCommand } from '../../command/delete-comment.command';
import { Comment } from '../../../domain/entities/comment.entity';
import { DeleteCommentEvent } from '../../event/delete-comment.event';

@CommandHandler(DeleteCommentCommand)
export class DeleteCommentHandler
  implements ICommandHandler<DeleteCommentCommand>
{
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private eventBus: EventBus,
  ) {}

  async execute(command: DeleteCommentCommand): Promise<void> {
    try {
      await this.commentRepository.delete(command.commentId);
      this.eventBus.publish(new DeleteCommentEvent(command.commentId));
    } catch (error) {
      this.eventBus.publish(new ErrorsEvent('DeleteCommentCommand', error));
      throw error;
    }
  }
}
