import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { RequestUser } from '../auth/interface/request-user.interface';
import { PostDto } from '../post/domain/dto/post.dto';
import { ReportRequestDto } from './domain/dto/report-request.dto';
import JwtRefreshGuard from '../auth/guards/jwt-refresh-token.guard';

@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Get('')
  getAllReport() {
    return this.reportService.getReports();
  }

  @Get(':id')
  getReport(@Param('id') id: string) {
    return this.reportService.getReportWithId(id);
  }

  // Comment
  @Get('comment/:id')
  getReportedComment(@Param('id') id: string) {
    return this.reportService.getReportedComment(id);
  }

  @Get('comments')
  getReportedComments() {
    return this.reportService.getReportedComments();
  }

  @Post('comment')
  @UseGuards(JwtRefreshGuard)
  createReportComment(
    @Req() request: RequestUser,
    @Body() reportDto: ReportRequestDto,
  ) {
    const { user } = request;
    return this.reportService.createReportComment(user.id, reportDto);
  }

  // Event
  @Get('event/:id')
  getReportedEvent(@Param('id') id: string) {
    return this.reportService.getReportedEvent(id);
  }

  @Get('events')
  getReportedEvents() {
    return this.reportService.getReportedEvents();
  }

  @Post('event')
  @UseGuards(JwtRefreshGuard)
  createReportEvent(
    @Req() request: RequestUser,
    @Body() reportDto: ReportRequestDto,
  ) {
    const { user } = request;
    return this.reportService.createReportEvent(user.id, reportDto);
  }

  //Group
  @Get('group/:id')
  getReportedGroup(@Param('id') id: string) {
    return this.reportService.getReportedGroup(id);
  }

  @Get('groups')
  getReportedGroups() {
    return this.reportService.getReportedGroups();
  }

  @Post('group')
  @UseGuards(JwtRefreshGuard)
  createReportGroup(
    @Req() request: RequestUser,
    @Body() reportDto: ReportRequestDto,
  ) {
    const { user } = request;
    return this.reportService.createReportGroup(user.id, reportDto);
  }

  // User
  @Get('user/:id')
  getReportedUser(@Param('id') id: string) {
    return this.reportService.getReportedUser(id);
  }

  @Get('users')
  getReportedUsers() {
    return this.reportService.getReportedUsers();
  }

  @Post('user')
  @UseGuards(JwtRefreshGuard)
  createReportUser(
    @Req() request: RequestUser,
    @Body() reportDto: ReportRequestDto,
  ) {
    const { user } = request;
    return this.reportService.createReportUser(user.id, reportDto);
  }

  @Post('post')
  @UseGuards(JwtRefreshGuard)
  createReportPost(
    @Req() request: RequestUser,
    @Body() reportDto: ReportRequestDto,
  ) {
    const { user } = request;
    return this.reportService.createReportPost(user.id, reportDto);
  }
}
