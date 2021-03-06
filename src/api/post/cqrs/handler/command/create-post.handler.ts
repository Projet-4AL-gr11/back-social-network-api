import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreatePostEvent } from '../../event/create-post.event';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../../../domain/entities/post.entity';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { CreatePostCommand } from '../../command/create-post.command';
import { validate } from 'class-validator';

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private eventBus: EventBus,
  ) {}

  async execute(command: CreatePostCommand): Promise<Post> {
    try {
      let post: Post;
      if (command.postDto?.group) {
        post = this.postRepository.create({
          ...command.postDto,
          creator: command.user,
        });
      } else {
        post = this.postRepository.create({
          ...command.postDto,
          creator: command.user,
        });
      }

      const err = await validate(post);
      if (err.length > 0) {
        throw err;
      }
      const savedPost = await this.postRepository.save(post);

      if (command.postDto?.group) {
        this.eventBus.publish(
          new CreatePostEvent(command.user.id, savedPost.id, command.group.id),
        );
      } else {
        this.eventBus.publish(
          new CreatePostEvent(command.user.id, savedPost.id),
        );
      }
      return savedPost;
    } catch (error) {
      this.eventBus.publish(new ErrorsEvent('CreatePostHandler', error));
      throw error;
    }
  }
}
