import { EventBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from '../../domain/entities/media.entity';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../util/error/errorsEvent';
import { S3 } from 'aws-sdk';
import { config } from 'dotenv';
import { GetPictureTemporaryLinkQuery } from '../query/get-picture-temporary-link.query';

config();

@QueryHandler(GetPictureTemporaryLinkQuery)
export class GetPictureTemporaryLinkHandler
  implements IQueryHandler<GetPictureTemporaryLinkQuery>
{
  constructor(
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
    private eventBus: EventBus,
  ) {}

  async execute(query: GetPictureTemporaryLinkQuery): Promise<any> {
    try {
      const url = await this.generateResignedUrl(query.picture.key);
      return {
        ...query.picture,
        url,
      };
    } catch (error) {
      this.eventBus.publish(new ErrorsEvent('GetTemporaryLinkHandler', error));
      throw error;
    }
  }

  private async generateResignedUrl(key: string) {
    const s3 = new S3();

    return s3.getSignedUrlPromise('getObject', {
      Bucket: process.env.AWS_PRIVATE_BUCKET_NAME,
      Key: key,
    });
  }
}
