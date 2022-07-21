import { config } from 'dotenv';
import { EventBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { S3 } from 'aws-sdk';
import { GetExecutionFileTemporaryLinkQuery } from '../../query/get-execution-file-temporary-link.query';
import { ExecutionFile } from '../../../domain/entities/execution-file.entity';

config();

@QueryHandler(GetExecutionFileTemporaryLinkQuery)
export class GetExecutionFileTemporaryLinkHandler
  implements IQueryHandler<GetExecutionFileTemporaryLinkQuery>
{
  constructor(
    @InjectRepository(ExecutionFile)
    private executionFileRepository: Repository<ExecutionFile>,
    private eventBus: EventBus,
  ) {}

  async execute(query: GetExecutionFileTemporaryLinkQuery): Promise<any> {
    try {
      const url = await this.generateResignedUrl(query.executionFile.key);
      return {
        ...query.executionFile,
        url,
      };
    } catch (error) {
      this.eventBus.publish(
        new ErrorsEvent('GetExecutionFileTemporaryLinkQuery', error),
      );
      throw error;
    }
  }

  private async generateResignedUrl(key: string) {
    const s3 = new S3();

    return s3.getSignedUrlPromise('getObject', {
      Bucket: process.env.AWS_PRIVATE_BUCKET_NAME_EXERCISE,
      Key: key,
    });
  }
}
