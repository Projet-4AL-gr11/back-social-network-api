import { Media } from '../../domain/entities/media.entity';

export class GetPictureTemporaryLinkQuery {
  constructor(public readonly picture: Media) {}
}
