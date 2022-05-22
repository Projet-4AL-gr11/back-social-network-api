import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './domain/entities/media.entity';
import { MediaService } from './media.service';
import { SaveProfilePictureHandler } from './cqrs/handler/command/save-profile-picture.handler';
import { SaveBannerPictureHandler } from './cqrs/handler/command/save-banner-picture.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { MediaController } from './media.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Media]), CqrsModule],
  controllers: [MediaController],
  providers: [
    MediaService,
    SaveProfilePictureHandler,
    SaveBannerPictureHandler,
  ],
  exports: [MediaService],
})
export class MediaModule {}
