import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Exercise } from './domain/entities/exercise.entity';
import { GetExerciseHandler } from './cqrs/handler/query/get-exercise.handler';
import { ExerciseTemplate } from './domain/entities/exercise-template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise, ExerciseTemplate]), CqrsModule],
  providers: [GetExerciseHandler],
})
export class ExerciseModule {}

// TODO: Vérifier que pour get un exercice la date de l'event a bien commencé et qu'il n'est pas finit
