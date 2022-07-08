import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './domain/entities/media.entity';
import { MediaService } from './media.service';
import { SaveProfilePictureHandler } from './cqrs/handler/command/save-profile-picture.handler';
import { SaveBannerPictureHandler } from './cqrs/handler/command/save-banner-picture.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { MediaController } from './media.controller';
import { DeletePictureHandler } from './cqrs/handler/command/delete-picture.handler';
import { SaveCommentPictureHandler } from './cqrs/handler/command/save-comment-picture.handler';
import { SaveGroupPictureHandler } from './cqrs/handler/command/save-group-picture.handler';
import { SavePostPictureHandler } from './cqrs/handler/command/save-post-picture.handler';
import { DeletePictureEventHandler } from './cqrs/event-handler/delete-picture-event.handler';
import { SaveBannerPictureEventHandler } from './cqrs/event-handler/save-banner-picture.event-handler';
import { SaveCommentPictureEventHandler } from './cqrs/event-handler/save-comment-picture.event-handler';
import { SaveEventPictureEventHandler } from './cqrs/event-handler/save-event-picture.event-handler';
import { SaveGroupPictureEventHandler } from './cqrs/event-handler/save-group-picture.event-handler';
import { SavePostPictureEventHandler } from './cqrs/event-handler/save-post-picture.event-handler';
import { ErrorEventHandler } from '../../util/error/error.event-handler';
import { GetPictureTemporaryLinkHandler } from './cqrs/handler/query/get-picture-temporary-link.handler';
import { GetPictureWithIdHandler } from './cqrs/handler/query/get-picture-with-id.handler';
import { SaveGroupBannerPictureEventHandler } from './cqrs/event-handler/save-group-banner-picture.event-handler';
import { SaveGroupBannerPictureHandler } from './cqrs/handler/command/save-group-banner-picture.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Media]), CqrsModule],
  controllers: [MediaController],
  providers: [
    MediaService,
    SaveProfilePictureHandler,
    SaveBannerPictureHandler,
    DeletePictureHandler,
    SaveCommentPictureHandler,
    SaveGroupPictureHandler,
    SavePostPictureHandler,
    DeletePictureEventHandler,
    SaveBannerPictureEventHandler,
    SaveCommentPictureEventHandler,
    SaveEventPictureEventHandler,
    SaveGroupPictureEventHandler,
    SavePostPictureEventHandler,
    ErrorEventHandler,
    GetPictureTemporaryLinkHandler,
    GetPictureWithIdHandler,
    SaveGroupBannerPictureHandler,
    SaveGroupBannerPictureEventHandler,
  ],
  exports: [MediaService],
})
export class MediaModule {}
