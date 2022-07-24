import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from '../../../event/domain/entities/event.entity';
import { Leaderboard } from '../../../execution/domain/entities/leaderboard.entity';
import { ExerciseTemplate } from '../../../exercices/domain/entities/exercise-template.entity';

@Entity()
export class Language {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @OneToMany(
    () => ExerciseTemplate,
    (exerciseTemplate) => exerciseTemplate.language,
  )
  exerciseTemplates: ExerciseTemplate[];
  @OneToMany(() => Event, (event) => event.languages)
  events: Event[];
  @OneToMany(() => Leaderboard, (leaderboard) => leaderboard.language)
  leaderboards: Leaderboard[];
  @CreateDateColumn()
  createdAt: Date;
  @Column({ nullable: true })
  abbreviation: string;
}
