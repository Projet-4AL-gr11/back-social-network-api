import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MediaDto } from './domain/dto/media.dto';
import { Media } from './domain/entities/media.entity';
import { SaveProfilePictureCommand } from './cqrs/command/save-profile-picture.command';
import { SaveBannerPictureCommand } from './cqrs/command/save-banner-picture.command';

@Injectable()
export class MediaService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  async uploadProfilePicture(mediaDto: MediaDto): Promise<Media> {
    return this.commandBus.execute(new SaveProfilePictureCommand(mediaDto));
  }

  async uploadBannerPicture(mediaDto: MediaDto): Promise<Media> {
    return this.commandBus.execute(new SaveBannerPictureCommand(mediaDto));
  }
}
