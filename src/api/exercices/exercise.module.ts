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
import { GetExerciseTemplateHandler } from './cqrs/handler/query/get-exercise-template.handler';
import { ErrorEventHandler } from '../../util/error/error.event-handler';
import { CreateExerciseTemplateHandler } from './cqrs/handler/command/create-exercise-template.handler';
import { CreateExerciseTemplateEventHandler } from './cqrs/event-handler/create-exercise-template.event-handler';
import { UpdateExerciseTemplateHandler } from './cqrs/handler/command/update-exercise-template.handler';
import { UpdateExerciseTemplateEventHandler } from './cqrs/event-handler/update-exercise-template.event-handler';
import { RemoveExerciseTemplateHandler } from './cqrs/handler/command/remove-exercise-template.handler';
import { RemoveExerciseTemplateEventHandler } from './cqrs/event-handler/remove-exercise-template.event-handler';
import { Language } from '../language/domain/entities/language.entity';
import { CreateExerciseHandler } from './cqrs/handler/command/create-exercise.handler';
import { CreateExerciseEventHandler } from './cqrs/event-handler/create-exercise.event-handler';

@Module({
  imports: [
    TypeOrmModule.forFeature([Exercise, ExerciseTemplate, Event, Language]),
    CqrsModule,
  ],
  controllers: [ExerciseController],
  providers: [
    ExerciseService,
    GetExerciseHandler,
    GetEventExerciseHandler,
    GetExerciseTemplateWithExerciseIdHandler,
    GetExerciseTemplateHandler,
    CreateExerciseTemplateHandler,
    CreateExerciseTemplateEventHandler,
    UpdateExerciseTemplateHandler,
    UpdateExerciseTemplateEventHandler,
    RemoveExerciseTemplateHandler,
    RemoveExerciseTemplateEventHandler,
    CreateExerciseHandler,
    CreateExerciseEventHandler,
    ErrorEventHandler,
  ],
})
export class ExerciseModule {}
