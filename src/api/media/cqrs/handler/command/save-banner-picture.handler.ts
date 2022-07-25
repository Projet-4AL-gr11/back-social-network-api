import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { Media } from '../../../domain/entities/media.entity';
import { S3 } from 'aws-sdk';
import { config } from 'dotenv';
import { v4 as uuid } from 'uuid';
import { SaveBannerPictureCommand } from '../../command/save-banner-picture.command';
import { SaveBannerPictureEvent } from '../../event/save-banner-picture.event';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';

config();

@CommandHandler(SaveBannerPictureCommand)
export class SaveBannerPictureHandler
  implements ICommandHandler<SaveBannerPictureCommand>
{
  constructor(
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
    private eventBus: EventBus,
  ) {}

  async execute(command: SaveBannerPictureCommand): Promise<Media> {
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
        userBanner: {
          id: command.mediaDto.ownerId,
        },
      });
      await this.mediaRepository.save(newFile);
      command.mediaDto.fileName = newFile.key;
      this.eventBus.publish(new SaveBannerPictureEvent(command.mediaDto));
      return newFile;
    } catch (error) {
      this.eventBus.publish(new ErrorsEvent('SaveBannerPictureHandler', error));
      throw error;
    }
  }
}
