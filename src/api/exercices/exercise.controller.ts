import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import JwtRefreshGuard from '../auth/guards/jwt-refresh-token.guard';
import { ExerciseTemplateDto } from './domain/dto/exercise-template.dto';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @UseGuards(JwtRefreshGuard)
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.exerciseService.getById(id);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('exerciseTemplate/all')
  getAllExerciseTemplate() {
    return this.exerciseService.getAllExerciseTemplate();
  }

  @UseGuards(JwtRefreshGuard)
  @Get('exerciseTemplate/:id')
  getExerciseTemplateById(@Param('id') id: string) {
    return this.exerciseService.getExerciseTemplateById(id);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('event/:id')
  getEventExercise(@Param('id') id: string) {
    return this.exerciseService.getEventExercise(id);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('exerciseTemplate/:id')
  getExerciseTemplateWithExerciseId(@Param('id') id: string) {
    return this.exerciseService.getExerciseTemplateWithExerciseId(id);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('exerciseTemplate')
  createExerciseTemplate(
    @Body() createExerciseTemplateDto: ExerciseTemplateDto,
  ) {
    return this.exerciseService.createExerciseTemplate(
      createExerciseTemplateDto,
    );
  }

  @UseGuards(JwtRefreshGuard)
  @Put('exerciseTemplate')
  updateExerciseTemplate(
    @Body() updateExerciseTemplateDto: ExerciseTemplateDto,
  ) {
    return this.exerciseService.updateExerciseTemplate(
      updateExerciseTemplateDto,
    );
  }

  @UseGuards(JwtRefreshGuard)
  @Delete('exerciseTemplate/:id')
  deleteExerciseTemplate(@Param('id') id: string) {
    return this.exerciseService.deleteExerciseTemplate(id);
  }
}
