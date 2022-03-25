import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MediaDto } from './domain/dto/media.dto';
import { Media } from './domain/entities/media.entity';
import { SaveProfilePictureCommand } from './cqrs/command/save-profile-picture.command';
import { SaveBannerPictureCommand } from './cqrs/command/save-banner-picture.command';
import { MediaResponseDto } from './domain/dto/media-response.dto';
import { GetUserQuery } from '../user/cqrs/query/get-user.query';
import { Event } from '../event/domain/entities/event.entity';
import { Group } from '../group/domain/entities/group.entity';
import { GetGroupQuery } from '../group/cqrs/query/get-group.query';
import { GetPictureTemporaryLinkQuery } from './cqrs/query/get-picture-temporary-link.query';
import { DeletePictureCommand } from './cqrs/command/delete-picture.command';
import { SaveEventPictureCommand } from './cqrs/command/save-event-picture.command';
import { SaveGroupPictureCommand } from './cqrs/command/save-group-picture.command';

@Injectable()
export class MediaService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  async uploadProfilePicture(mediaDto: MediaDto): Promise<Media> {
    return this.commandBus.execute(new SaveProfilePictureCommand(mediaDto));
  }

  async uploadBannerPicture(mediaDto: MediaDto): Promise<Media> {
    return this.commandBus.execute(new SaveBannerPictureCommand(mediaDto));
  }

  async uploadEventPicture(mediaDto: MediaDto): Promise<Media> {
    return this.commandBus.execute(new SaveEventPictureCommand(mediaDto));
  }

  async uploadGroupPicture(mediaDto: MediaDto): Promise<Media> {
    return this.commandBus.execute(new SaveGroupPictureCommand(mediaDto));
  }

  async deleteBannerPicture(fileId: string): Promise<void> {
    return this.commandBus.execute(new DeletePictureCommand(fileId));
  }

  async deleteProfilePicture(fileId: string): Promise<void> {
    return this.commandBus.execute(new DeletePictureCommand(fileId));
  }

  async deleteEventPicture(fileId: string): Promise<void> {
    return this.commandBus.execute(new DeletePictureCommand(fileId));
  }

  async deleteGroupPicture(fileId: string): Promise<void> {
    return this.commandBus.execute(new DeletePictureCommand(fileId));
  }

  async getBannerPicture(userId: string): Promise<MediaResponseDto> {
    const user = await this.queryBus.execute(new GetUserQuery(userId));
    return this.queryBus.execute(
      new GetPictureTemporaryLinkQuery(user.bannerPicture),
    );
  }

  async getProfilePicture(userId: string): Promise<MediaResponseDto> {
    const user = await this.queryBus.execute(new GetUserQuery(userId));
    return this.queryBus.execute(
      new GetPictureTemporaryLinkQuery(user.profilePicture),
    );
  }

  async getEventPicture(eventId: string): Promise<MediaResponseDto> {
    const event: Event = await this.queryBus.execute(
      new GetEventQuery(eventId),
    );
    return this.queryBus.execute(
      new GetPictureTemporaryLinkQuery(event.picture),
    );
  }

  async getGroupPicture(groupId: string): Promise<MediaResponseDto> {
    const group: Group = await this.queryBus.execute(
      new GetGroupQuery(groupId),
    );
    return this.queryBus.execute(
      new GetPictureTemporaryLinkQuery(group.picture),
    );
  }
}
