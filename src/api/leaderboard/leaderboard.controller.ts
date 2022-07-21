import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { CreateLeaderboardDto } from './domain/dto/create-leaderboard.dto';
import { Leaderboard } from './domain/entities/leaderboard.entity';
import { EventRanking } from './domain/entities/event-ranking.entity';
import JwtRefreshGuard from '../auth/guards/jwt-refresh-token.guard';
import { RequestUser } from '../auth/interface/request-user.interface';
import { ExecuteRequestDto } from './domain/dto/execute-request.dto';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService) {}

  @Get(':id')
  async getLeaderboardById(@Param('id') id: string): Promise<Leaderboard> {
    return await this.leaderboardService.getById(id);
  }

  @Get('leaderboardExercise/:id')
  async getLeaderboardExercise(
    @Param('id') id: string,
  ): Promise<Leaderboard[]> {
    return await this.leaderboardService.getLeaderboardForExercise(id);
  }

  @Get('event/ranking/:id')
  async getEventRanking(@Param('id') id: string): Promise<EventRanking[]> {
    return await this.leaderboardService.getEventRanking(id);
  }

  @Get('allLeaderboardUser/:id')
  async getAllLeaderboardUser(@Param('id') id: string): Promise<Leaderboard[]> {
    return await this.leaderboardService.getLeaderboardForUser(id);
  }

  @Get('allLeaderboardUser/:id')
  async getLeaderboardForUserWithExerciseId(
    @Param('id') id: string,
    @Body() exerciseId: string,
  ): Promise<Leaderboard> {
    return await this.leaderboardService.getLeaderboardForUserWithExerciseId(
      id,
      exerciseId,
    );
  }

  @Post()
  async create(
    @Body() createLeaderboardDto: CreateLeaderboardDto,
  ): Promise<Leaderboard> {
    return this.leaderboardService.createLeaderboard(createLeaderboardDto);
  }

  @Put('leaderboard/:id')
  async updateLeaderboard(@Param('id') id: string): Promise<Leaderboard[]> {
    return this.leaderboardService.updateLeaderBoardRanking(id);
  }

  @Put('eventRanking/:id')
  async updateEventRanking(@Param('id') id: string): Promise<void> {
    return this.leaderboardService.updateEventRanking(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.leaderboardService.deleteLeaderboard(id);
  }

  @Post('execute')
  @UseGuards(JwtRefreshGuard)
  executeCode(
    @Req() request: RequestUser,
    @Body() executeRequestDto: ExecuteRequestDto,
  ) {
    const { user } = request;
    executeRequestDto.user = user;
    return this.leaderboardService.execCode(executeRequestDto);
  }

  @UseGuards(JwtRefreshGuard)
  @Get()
  findAllExec() {
    return this.leaderboardService.findAllExec();
  }
}
