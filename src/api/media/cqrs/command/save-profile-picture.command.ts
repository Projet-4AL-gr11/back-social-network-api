import { MediaDto } from '../../domain/dto/media.dto';

export class SaveProfilePictureCommand {
  constructor(public readonly mediaDto: MediaDto) {}
}
