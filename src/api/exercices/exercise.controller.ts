import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import JwtRefreshGuard from '../auth/guards/jwt-refresh-token.guard';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @UseGuards(JwtRefreshGuard)
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.exerciseService.getById(id);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('exerciseTemplate')
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
}
