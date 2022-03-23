import { EventBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetBannerPictureQuery } from '../query/get-banner-picture.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from '../../domain/entities/media.entity';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../util/error/errorsEvent';
import { S3 } from 'aws-sdk';
import { config } from 'dotenv';

config();

@QueryHandler(GetBannerPictureQuery)
export class GetBannerPictureHandler
  implements IQueryHandler<GetBannerPictureQuery>
{
  constructor(
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
    private eventBus: EventBus,
  ) {}

  async execute(query: GetBannerPictureQuery): Promise<any> {
    try {
      const url = await this.generateResignedUrl(query.bannerPicture.key);
      return {
        ...query.bannerPicture,
        url,
      };
    } catch (error) {
      this.eventBus.publish(new ErrorsEvent('GetBannerPictureHandler', error));
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
