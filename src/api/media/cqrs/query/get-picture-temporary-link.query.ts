import { Media } from '../../domain/entities/media.entity';

export class GetProfilePictureQuery {
  constructor(public readonly profilePicture: Media) {}
}
