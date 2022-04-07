import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exercise } from '../../../exercices/domain/entities/exercise.entity';
import { Event } from '../../../event/domain/entities/event.entity';
import {Leaderboard} from "../../../leaderboard/domain/entities/leaderboard.entity";
import {ExerciseTemplate} from "../../../exercices/domain/entities/exercise-template.entity";

@Entity()
export class Language {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @OneToMany(() => ExerciseTemplate, (exerciseTemplate) => exerciseTemplate.language)
  exerciseTemplates: ExerciseTemplate[];
  @OneToMany(() => Event, (event) => event.language)
  events: Event[];
  @OneToMany(() => Leaderboard, (leaderboard) => leaderboard.language)
  leaderboards: Leaderboard[];
  @CreateDateColumn()
  createdAt: Date;
}
