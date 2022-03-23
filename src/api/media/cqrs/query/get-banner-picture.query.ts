import { Media } from '../../domain/entities/media.entity';

export class GetBannerPictureQuery {
  constructor(public readonly bannerPicture: Media) {}
}
