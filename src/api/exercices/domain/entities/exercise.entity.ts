import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from '../../../event/domain/entities/event.entity';
import { Leaderboard } from '../../../leaderboard/domain/entities/leaderboard.entity';
import { ExerciseTemplate } from './exercise-template.entity';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Event, (event) => event.exercises, {})
  event: Event;

  @OneToMany(() => Leaderboard, (leaderboard) => leaderboard.exercise, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  leaderboards: Leaderboard[];

  @ManyToOne(
    () => ExerciseTemplate,
    (exerciseTemplate) => exerciseTemplate.exercises,
    {
      eager: true,
      nullable: false,
    },
  )
  exerciseTemplate: ExerciseTemplate;
}
