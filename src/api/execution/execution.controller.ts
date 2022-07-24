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
import { ExecutionService } from './execution.service';
import { CreateLeaderboardDto } from './domain/dto/create-leaderboard.dto';
import { Leaderboard } from './domain/entities/leaderboard.entity';
import { EventRanking } from './domain/entities/event-ranking.entity';
import JwtRefreshGuard from '../auth/guards/jwt-refresh-token.guard';
import { RequestUser } from '../auth/interface/request-user.interface';
import { ExecuteRequestDto } from './domain/dto/execute-request.dto';
import { ExecuteDto } from "./domain/dto/execute.dto";

@Controller('execution')
export class ExecutionController {
  constructor(private executionService: ExecutionService) {}

  @Get(':id')
  async getLeaderboardById(@Param('id') id: string): Promise<Leaderboard> {
    return await this.executionService.getById(id);
  }

  @Get('leaderboardExercise/:id')
  async getLeaderboardExercise(
    @Param('id') id: string,
  ): Promise<Leaderboard[]> {
    return await this.executionService.getLeaderboardForExercise(id);
  }

  @Get('event/ranking/:id')
  async getEventRanking(@Param('id') id: string): Promise<EventRanking[]> {
    return await this.executionService.getEventRanking(id);
  }

  @Get('allLeaderboardUser/:id')
  async getAllLeaderboardUser(@Param('id') id: string): Promise<Leaderboard[]> {
    return await this.executionService.getLeaderboardForUser(id);
  }

  @Get('allLeaderboardUser/:id')
  async getLeaderboardForUserWithExerciseId(
    @Param('id') id: string,
    @Body() exerciseId: string,
  ): Promise<Leaderboard> {
    return await this.executionService.getLeaderboardForUserWithExerciseId(
      id,
      exerciseId,
    );
  }

  @Post()
  async create(
    @Body() createLeaderboardDto: CreateLeaderboardDto,
  ): Promise<Leaderboard> {
    return this.executionService.createLeaderboard(createLeaderboardDto);
  }

  @Put('execution/:id')
  async updateLeaderboard(@Param('id') id: string): Promise<Leaderboard[]> {
    return this.executionService.updateLeaderBoardRanking(id);
  }

  @Put('eventRanking/:id')
  async updateEventRanking(@Param('id') id: string): Promise<void> {
    return this.executionService.updateEventRanking(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.executionService.deleteLeaderboard(id);
  }

  @Post('execute')
  @UseGuards(JwtRefreshGuard)
  executeCode(
    @Req() request: RequestUser,
    @Body() executeRequestDto: ExecuteRequestDto,
  ) {
    const { user } = request;
    executeRequestDto.user = user;
    return this.executionService.execCode(executeRequestDto);
  }

  @Post('sandbox')
  executeSandbox(@Body() createExecuteDto: ExecuteDto) {
    console.log(createExecuteDto);
    return this.executionService.execSandbox(createExecuteDto);
  }

  @UseGuards(JwtRefreshGuard)
  @Get()
  findAllExec() {
    return this.executionService.findAllExec();
  }
}
