import { MediaDto } from '../../domain/dto/media.dto';

export class SaveEventPictureCommand {
  constructor(public readonly mediaDto: MediaDto) {}
}
