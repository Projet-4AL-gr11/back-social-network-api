import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Exercise } from './domain/entities/exercise.entity';
import {GetExerciseHandler} from "./cqrs/handler/query/get-exercise.handler";

@Module({
  imports: [TypeOrmModule.forFeature([Exercise]), CqrsModule],
  providers: [GetExerciseHandler]
})
export class ExerciseModule {}
