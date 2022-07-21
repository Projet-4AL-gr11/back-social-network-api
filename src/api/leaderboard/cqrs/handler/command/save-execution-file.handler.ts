import { config } from 'dotenv';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { SaveProfilePictureCommand } from '../../../../media/cqrs/command/save-profile-picture.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from '../../../../media/domain/entities/media.entity';
import { Repository } from 'typeorm';
import { S3 } from 'aws-sdk';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { SaveExecutionFileCommand } from '../../command/save-execution-file.command';
import { ExecutionFile } from '../../../domain/entities/execution-file.entity';
import { v4 as uuid } from 'uuid';
import { SaveExecutionFileEvent } from '../../event/save-execution-file.event';

config();

@CommandHandler(SaveExecutionFileCommand)
export class SaveExecutionFileHandler
  implements ICommandHandler<SaveExecutionFileCommand>
{
  constructor(
    @InjectRepository(ExecutionFile)
    private executionFileRepository: Repository<ExecutionFile>,
    private eventBus: EventBus,
  ) {}

  async execute(command: SaveExecutionFileCommand): Promise<ExecutionFile> {
    try {
      const s3 = new S3();
      const uploadResult = await s3
        .upload({
          Bucket: process.env.AWS_PRIVATE_BUCKET_NAME_EXERCISE,
          Body: command.executionFileDto.dataBuffer,
          Key: `${uuid()}-${command.executionFileDto.fileName}`,
        })
        .promise();

      const newFile = this.executionFileRepository.create({
        key: uploadResult.Key,
        leaderboard: {
          id: command.executionFileDto.ownerId,
        },
      });
      await this.executionFileRepository.save(newFile);
      command.executionFileDto.fileName = newFile.key;
      this.eventBus.publish(
        new SaveExecutionFileEvent(command.executionFileDto),
      );
      return newFile;
    } catch (error) {
      await this.eventBus.publish(
        new ErrorsEvent('SaveExecutionFileHandler', error),
      );
      throw error;
    }
  }
}
