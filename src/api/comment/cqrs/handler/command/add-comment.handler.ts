import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { AddCommentCommand } from '../../command/add-comment.command';
import { AddCommentEvent } from '../../event/add-comment.event';
import { Comment } from '../../../domain/entities/comment.entity';

@CommandHandler(AddCommentCommand)
export class AddCommentHandler implements ICommandHandler<AddCommentCommand> {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private eventBus: EventBus,
  ) {}

  async execute(command: AddCommentCommand): Promise<Comment> {
    try {
      const comment = this.commentRepository.create({
        creator: command.user,
        post: command.post,
        text: command.text,
      });
      const err = await validate(comment);
      if (err.length > 0) {
        throw err;
      }
      const newComment = await this.commentRepository.save(comment);
      this.eventBus.publish(
        new AddCommentEvent(command.user.id, command.post.id, newComment.id),
      );
      return newComment;
    } catch (error) {
      // TODO: créer une vrai erreur
      this.eventBus.publish(new ErrorsEvent('AddCommentCommand', error));
      throw error;
    }
  }
}
