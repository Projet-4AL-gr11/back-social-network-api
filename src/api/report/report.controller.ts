import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ReportService } from './report.service';
import { RequestUser } from '../auth/interface/request-user.interface';
import { PostDto } from '../post/domain/dto/post.dto';
import { ReportRequestDto } from './domain/dto/report-request.dto';

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

  @Post()
  createReportComment(@Body() reportDto: ReportRequestDto) {
    return this.reportService.createReportComment(reportDto);
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

  @Post()
  createReportEvent(@Body() reportDto: ReportRequestDto) {
    return this.reportService.createReportEvent(reportDto);
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

  @Post()
  createReportGroup(@Body() reportDto: ReportRequestDto) {
    return this.reportService.createReportGroup(reportDto);
  }

  // User
  @Get('user/:id')
  getReportedUser(@Param('id') id: string) {
    return this.reportService.getReportedUser(id);
  }

  @Get('comments')
  getReportedUsers() {
    return this.reportService.getReportedUsers();
  }

  @Post()
  createReportUser(@Body() reportDto: ReportRequestDto) {
    return this.reportService.createReportUser(reportDto);
  }
}
