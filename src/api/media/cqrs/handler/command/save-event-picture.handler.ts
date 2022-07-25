import { config } from 'dotenv';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from '../../../domain/entities/media.entity';
import { Repository } from 'typeorm';
import { S3 } from 'aws-sdk';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { SaveEventPictureCommand } from '../../command/save-event-picture.command';
import { v4 as uuid } from 'uuid';
import { SaveEventPictureEvent } from '../../event/save-event-picture.event';

config();

@CommandHandler(SaveEventPictureCommand)
export class SaveEventPictureHandler
  implements ICommandHandler<SaveEventPictureCommand>
{
  constructor(
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
    private eventBus: EventBus,
  ) {}

  async execute(command: SaveEventPictureCommand): Promise<Media> {
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
        eventPicture: {
          id: command.mediaDto.ownerId,
        },
      });
      await this.mediaRepository.save(newFile);
      command.mediaDto.fileName = newFile.key;
      this.eventBus.publish(new SaveEventPictureEvent(command.mediaDto));
      return newFile;
    } catch (error) {
      this.eventBus.publish(new ErrorsEvent('SaveEventPictureHandler', error));
      throw error;
    }
  }
}
