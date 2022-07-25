import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from '../../../domain/entities/media.entity';
import { Repository } from 'typeorm';
import { S3 } from 'aws-sdk';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { v4 as uuid } from 'uuid';
import { SavePostPictureCommand } from '../../command/save-post-picture.command';
import { SavePostPictureEvent } from '../../event/save-post-picture.event';

@CommandHandler(SavePostPictureCommand)
export class SavePostPictureHandler
  implements ICommandHandler<SavePostPictureCommand>
{
  constructor(
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
    private eventBus: EventBus,
  ) {}

  async execute(command: SavePostPictureCommand): Promise<Media> {
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
        post: {
          id: command.mediaDto.ownerId,
        },
      });
      await this.mediaRepository.save(newFile);
      command.mediaDto.fileName = newFile.key;
      this.eventBus.publish(new SavePostPictureEvent(command.mediaDto));
      return newFile;
    } catch (error) {
      this.eventBus.publish(new ErrorsEvent('SavePostPictureHandler', error));
      throw error;
    }
  }
}
