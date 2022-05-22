import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { CreateLeaderboardDto } from './domain/dto/create-leaderboard.dto';
import { Leaderboard } from './domain/entities/leaderboard.entity';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService) {}

  @Get('leaderboardById/:id')
  async getLeaderboardById(@Param('id') id: string): Promise<Leaderboard> {
    return await this.leaderboardService.getById(id);
  }

  @Get('leaderboardExercise/:id')
  async getLeaderboardExercise(
    @Param('id') id: string,
  ): Promise<Leaderboard[]> {
    return await this.leaderboardService.getLeaderboardForExercise(id);
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
}
