import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetPictureWithIdQuery } from '../../query/get-picture-with-id.query';
import { Media } from '../../../domain/entities/media.entity';

@QueryHandler(GetPictureWithIdQuery)
export class GetPictureWithIdHandler
  implements IQueryHandler<GetPictureWithIdQuery>
{
  constructor(
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
  ) {}

  execute(query: GetPictureWithIdQuery): Promise<any> {
    return this.mediaRepository.findOne(query.pictureId);
  }
}
