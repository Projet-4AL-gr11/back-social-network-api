import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { SaveProfilePictureCommand } from '../../command/save-profile-picture.command';
import { Repository } from 'typeorm';
import { Media } from '../../../domain/entities/media.entity';
import { S3 } from 'aws-sdk';
import { config } from 'dotenv';
import { v4 as uuid } from 'uuid';
import { SaveProfilePictureEvent } from '../../event/save-profile-picture.event';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';

config();

@CommandHandler(SaveProfilePictureCommand)
export class SaveProfilePictureHandler
  implements ICommandHandler<SaveProfilePictureCommand>
{
  constructor(
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
    private eventBus: EventBus,
  ) {}

  async execute(command: SaveProfilePictureCommand): Promise<Media> {
    try {
      const s3 = new S3();
      const uploadResult = await s3
        .upload({
          Bucket: process.env.AWS_PRIVATE_BUCKET_NAME,
          Body: command.mediaDto.dataBuffer,
          Key: `${uuid()}-${command.mediaDto.fileName}`,
        })
        .promise();

      const newFile = this.mediaRepository.create({
        key: uploadResult.Key,
        userProfilePicture: {
          id: command.mediaDto.ownerId,
        },
      });
      await this.mediaRepository.save(newFile);
      command.mediaDto.fileName = newFile.key;
      this.eventBus.publish(new SaveProfilePictureEvent(command.mediaDto));
      return newFile;
    } catch (error) {
      await this.eventBus.publish(
        new ErrorsEvent('SaveProfilePictureHandler', error),
      );
      throw error;
    }
  }
}
