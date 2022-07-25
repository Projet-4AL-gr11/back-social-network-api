import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { config } from 'dotenv';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from '../../../domain/entities/media.entity';
import { Repository } from 'typeorm';
import { S3 } from 'aws-sdk';
import { DeletePictureEvent } from '../../event/delete-picture.event';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { DeletePictureCommand } from '../../command/delete-picture.command';

config();

@CommandHandler(DeletePictureCommand)
export class DeletePictureHandler
  implements ICommandHandler<DeletePictureCommand>
{
  constructor(
    @InjectRepository(Media) public mediaRepository: Repository<Media>,
    public eventBus: EventBus,
  ) {}

  async execute(command: DeletePictureCommand): Promise<void> {
    try {
      const file = await this.mediaRepository.findOne({ id: command.fileId });
      const s3 = new S3();
      await s3
        .deleteObject({
          Bucket: process.env.AWS_PRIVATE_BUCKET_NAME,
          Key: file.key,
        })
        .promise();
      await this.mediaRepository.delete(command.fileId);
      await this.eventBus.publish(new DeletePictureEvent(command.fileId));
    } catch (error) {
      await this.eventBus.publish(
        new ErrorsEvent('DeletePictureHandler', error),
      );
      throw error;
    }
  }
}
