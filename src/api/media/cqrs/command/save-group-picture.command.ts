import { MediaDto } from '../../domain/dto/media.dto';

export class SaveGroupPictureCommand {
  constructor(public readonly mediaDto: MediaDto) {}
}
