import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from '../../../event/domain/entities/event.entity';
import { Leaderboard } from '../../../execution/domain/entities/leaderboard.entity';
import { ExerciseTemplate } from './exercise-template.entity';
import { Report } from '../../../report/domain/entities/report.entity';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Event, (event) => event.exercises, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'eventId', referencedColumnName: 'id' })
  event: Event;

  @OneToMany(() => Leaderboard, (leaderboard) => leaderboard.exercise, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  leaderboards: Leaderboard[];

  @ManyToOne(
    () => ExerciseTemplate,
    (exerciseTemplate) => exerciseTemplate.exercises,
    {
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'exerciseTemplateId', referencedColumnName: 'id' })
  exerciseTemplate: ExerciseTemplate;

  @OneToMany(() => Report, (report) => report.reportedExercise, {
    onDelete: 'CASCADE',
  })
  reported: Report[];
}
