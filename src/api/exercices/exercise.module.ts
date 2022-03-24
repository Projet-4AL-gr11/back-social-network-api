import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Exercise } from './domain/entities/exercise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise]), CqrsModule],
})
export class ExerciseModule {}
