import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProfilePictureCommand } from '../command/delete-profile-picture.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from '../../domain/entities/media.entity';
import { Repository } from 'typeorm';
import { S3 } from 'aws-sdk';
import { DeleteBannerPictureEvent } from '../event/delete-banner-picture.event';
import { ErrorsEvent } from '../../../../util/error/errorsEvent';
import { DeleteProfilePictureEvent } from '../event/delete-profile-picture.event';

@CommandHandler(DeleteProfilePictureCommand)
export class DeleteProfilePictureHandler
  implements ICommandHandler<DeleteProfilePictureCommand>
{
  constructor(
    @InjectRepository(Media)
    public mediaRepository: Repository<Media>,
    public eventBus: EventBus,
  ) {}

  async execute(command: DeleteProfilePictureCommand): Promise<void> {
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
      await this.eventBus.publish(
        new DeleteProfilePictureEvent(command.fileId),
      );
    } catch (error) {
      // TODO: Trouver une vrai erreur a envoyé
      await this.eventBus.publish(
        new ErrorsEvent('DeleteProfilePictureHandler', error),
      );
      throw error;
    }
  }
}
