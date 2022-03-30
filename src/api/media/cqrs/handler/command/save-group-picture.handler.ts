import { config } from 'dotenv';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from '../../../domain/entities/media.entity';
import { Repository } from 'typeorm';
import { S3 } from 'aws-sdk';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { v4 as uuid } from 'uuid';
import { SaveGroupPictureCommand } from '../../command/save-group-picture.command';
import { SaveGroupPictureEvent } from '../../event/save-group-picture.event';

config();

@CommandHandler(SaveGroupPictureCommand)
export class SaveGroupPictureHandler
  implements ICommandHandler<SaveGroupPictureCommand>
{
  constructor(
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
    private eventBus: EventBus,
  ) {}

  async execute(command: SaveGroupPictureCommand): Promise<Media> {
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
        groupPicture: {
          id: command.mediaDto.ownerId,
        },
      });
      await this.mediaRepository.save(newFile);
      command.mediaDto.fileName = newFile.key;
      this.eventBus.publish(new SaveGroupPictureEvent(command.mediaDto));
      return newFile;
    } catch (error) {
      // TODO: Trouver une vrai erreur a envoyé
      this.eventBus.publish(new ErrorsEvent('SaveEventPictureHandler', error));
      throw error;
    }
  }
}