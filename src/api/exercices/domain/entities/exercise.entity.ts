import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
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

  @ManyToOne(() => Event, (event) => event.exercises, {
    eager: true,
  })
  event: Event;

  @OneToMany(() => Leaderboard, (leaderboard) => leaderboard.exercise, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  leaderboards: Leaderboard[];

  @ManyToOne(
    () => ExerciseTemplate,
    (exerciseTemplate) => exerciseTemplate.exercise,
    {
      nullable: false,
    },
  )
  exerciseTemplate: ExerciseTemplate;
}
