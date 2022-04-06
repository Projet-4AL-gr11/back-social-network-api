import {
  Controller,
  Delete,
  Get,
  Param,
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

  @Get('groupPicture/:groupId')
  @UseGuards(JwtRefreshGuard)
  async getGroupPicture(@Param('groupId') groupId: string) {
    return this.mediaService.getGroupPicture(groupId);
  }

  @Get('eventPicture/:eventId')
  @UseGuards(JwtRefreshGuard)
  async getEventPicture(@Param('eventId') eventId: string) {
    return this.mediaService.getEventPicture(eventId);
  }

  @Get('postPicture/:postId')
  @UseGuards(JwtRefreshGuard)
  async getPostPicture(@Param('postId') postId: string) {
    return this.mediaService.getPostPicture(postId);
  }

  @Get('commentPicture/:commentId')
  @UseGuards(JwtRefreshGuard)
  async getCommentPicture(@Param('commentId') commentId: string) {
    return this.mediaService.getCommentPicture(commentId);
  }

  @Delete('bannerPicture')
  @UseGuards(JwtRefreshGuard)
  async deleteBannerPicture(@Req() request: RequestUser) {
    return this.mediaService.deleteBannerPicture(request.user.id);
  }

  @Delete('profilePicture')
  @UseGuards(JwtRefreshGuard)
  async deleteProfilePicture(@Req() request: RequestUser) {
    return this.mediaService.deleteProfilePicture(request.user.id);
  }

  @Delete('file/:id')
  @UseGuards(JwtRefreshGuard)
  async deleteFile(@Param('id') id: string) {
    return this.mediaService.deletePicture(id);
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

  @Post('event-picture/:id')
  @UseGuards(JwtRefreshGuard)
  @UseInterceptors(FileInterceptor('file'))
  async saveEventPicture(
    @Param('id') id: string,
    @UploadedFile() file: multer.File,
  ) {
    return this.mediaService.uploadEventPicture({
      ownerId: id,
      dataBuffer: file.buffer,
      fileName: file.originalname,
    });
  }

  @Post('group-picture/:id')
  @UseGuards(JwtRefreshGuard)
  @UseInterceptors(FileInterceptor('file'))
  async saveGroupPicture(
    @Param('id') id: string,
    @UploadedFile() file: multer.File,
  ) {
    return this.mediaService.uploadGroupPicture({
      ownerId: id,
      dataBuffer: file.buffer,
      fileName: file.originalname,
    });
  }

  // TODO: A revoir pour plusieurs photo
  @Post('post-picture/:id')
  @UseGuards(JwtRefreshGuard)
  @UseInterceptors(FileInterceptor('file'))
  async savePostPicture(
    @Param('id') id: string,
    @UploadedFile() file: multer.File,
  ) {
    return this.mediaService.uploadPostPicture({
      ownerId: id,
      dataBuffer: file.buffer,
      fileName: file.originalname,
    });
  }

  // TODO: A revoir pour plusieurs photo
  @Post('post-picture/:id')
  @UseGuards(JwtRefreshGuard)
  @UseInterceptors(FileInterceptor('file'))
  async saveCommentPicture(
    @Param('id') id: string,
    @UploadedFile() file: multer.File,
  ) {
    return this.mediaService.uploadCommentPicture({
      ownerId: id,
      dataBuffer: file.buffer,
      fileName: file.originalname,
    });
  }
}
