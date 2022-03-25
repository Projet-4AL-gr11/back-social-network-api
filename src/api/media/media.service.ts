import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MediaDto } from './domain/dto/media.dto';
import { Media } from './domain/entities/media.entity';
import { SaveProfilePictureCommand } from './cqrs/command/save-profile-picture.command';
import { SaveBannerPictureCommand } from './cqrs/command/save-banner-picture.command';
import { MediaResponseDto } from './domain/dto/media-response.dto';
import { GetBannerPictureQuery } from './cqrs/query/get-banner-picture.query';
import { GetUserQuery } from '../user/cqrs/query/get-user.query';
import { GetProfilePictureQuery } from './cqrs/query/get-profile-picture.query';
import { DeleteBannerPictureCommand } from './cqrs/command/delete-banner-picture.command';
import { DeleteProfilePictureCommand } from './cqrs/command/delete-profile-picture.command';

@Injectable()
export class MediaService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  async uploadProfilePicture(mediaDto: MediaDto): Promise<Media> {
    return this.commandBus.execute(new SaveProfilePictureCommand(mediaDto));
  }

  async uploadBannerPicture(mediaDto: MediaDto): Promise<Media> {
    return this.commandBus.execute(new SaveBannerPictureCommand(mediaDto));
  }

  async deleteBannerPicture(fileId: string): Promise<void> {
    return this.commandBus.execute(new DeleteBannerPictureCommand(fileId));
  }

  async deleteProfilePicture(fileId: string): Promise<void> {
    return this.commandBus.execute(new DeleteProfilePictureCommand(fileId));
  }

  async getBannerPicture(userId: string): Promise<MediaResponseDto> {
    const user = await this.queryBus.execute(new GetUserQuery(userId));
    return this.queryBus.execute(new GetBannerPictureQuery(user.bannerPicture));
  }

  async getProfilePicture(userId: string): Promise<MediaResponseDto> {
    const user = await this.queryBus.execute(new GetUserQuery(userId));
    return this.queryBus.execute(
      new GetProfilePictureQuery(user.profilePicture),
    );
  }

  // TODO: Route pour eventPicture

  // TODO: Route pour groupPicture
}
