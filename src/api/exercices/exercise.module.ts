import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Exercise } from './domain/entities/exercise.entity';
import { GetExerciseHandler } from './cqrs/handler/query/get-exercise.handler';
import { ExerciseTemplate } from './domain/entities/exercise-template.entity';
import { Event } from '../event/domain/entities/event.entity';
import { ExerciseController } from './exercise.controller';
import { GetEventExerciseHandler } from './cqrs/handler/query/get-event-exercise.handler';
import { ExerciseService } from './exercise.service';
import { GetExerciseTemplateWithExerciseIdHandler } from './cqrs/handler/query/get-exercise-template-with-exercise-id.handler';
import { GetExerciseTemplateQuery } from './cqrs/query/get-exercise-template.query';
import { GetExerciseTemplateHandler } from './cqrs/handler/query/get-exercise-template.handler';

@Module({
  imports: [
    TypeOrmModule.forFeature([Exercise, ExerciseTemplate, Event]),
    CqrsModule,
  ],
  controllers: [ExerciseController],
  providers: [
    ExerciseService,
    GetExerciseHandler,
    GetEventExerciseHandler,
    GetExerciseTemplateWithExerciseIdHandler,
    GetExerciseTemplateHandler,
  ],
})
export class ExerciseModule {}

// TODO: Vérifier que pour get un exercice la date de l'event a bien commencé et qu'il n'est pas finit
