import {
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MediaService } from './media.service';
import JwtRefreshGuard from '../auth/guards/jwt-refresh-token.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { RequestUser } from '../auth/interface/request-user.interface';
import { Express } from 'express';
import multer = require('multer');

@Controller('media')
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @Get('profilePicture')
  @UseGuards(JwtRefreshGuard)
  async getProfilePicture(@Req() request: RequestUser) {
    return this.mediaService.getProfilePicture(request.user.id);
  }

  @Get('bannerPicture')
  @UseGuards(JwtRefreshGuard)
  async getBannerPicture(@Req() request: RequestUser) {
    return this.mediaService.getBannerPicture(request.user.id);
  }

  @Post('profile-picture')
  @UseGuards(JwtRefreshGuard)
  @UseInterceptors(FileInterceptor('file'))
  async saveProfilePicture(
    @Req() request: RequestUser,
    @UploadedFile() file: multer.File,
  ) {
    return this.mediaService.uploadProfilePicture({
      ownerId: request.user.id,
      dataBuffer: file.buffer,
      fileName: file.originalname,
    });
  }

  @Post('banner-picture')
  @UseGuards(JwtRefreshGuard)
  @UseInterceptors(FileInterceptor('file'))
  async saveBannerPicture(
    @Req() request: RequestUser,
    @UploadedFile() file: multer.File,
  ) {
    return this.mediaService.uploadBannerPicture({
      ownerId: request.user.id,
      dataBuffer: file.buffer,
      fileName: file.originalname,
    });
  }
}
