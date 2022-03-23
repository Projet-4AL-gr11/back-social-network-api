import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { DeleteBannerPictureCommand } from '../command/delete-banner-picture.command';
import { config } from 'dotenv';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from '../../domain/entities/media.entity';
import { Repository } from 'typeorm';
import { S3 } from 'aws-sdk';
import { DeleteBannerPictureEvent } from '../event/delete-banner-picture.event';
import { ErrorsEvent } from '../../../../util/error/errorsEvent';

config();

@CommandHandler(DeleteBannerPictureCommand)
export class DeleteBannerPictureHandler
  implements ICommandHandler<DeleteBannerPictureCommand>
{
  constructor(
    @InjectRepository(Media) public mediaRepository: Repository<Media>,
    public eventBus: EventBus,
  ) {}

  async execute(command: DeleteBannerPictureCommand): Promise<void> {
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
      await this.eventBus.publish(new DeleteBannerPictureEvent(command.fileId));
    } catch (error) {
      // TODO: Trouver une vrai erreur a envoyé
      await this.eventBus.publish(
        new ErrorsEvent('DeleteBannerPictureHandler', error),
      );
      throw error;
    }
  }
}
