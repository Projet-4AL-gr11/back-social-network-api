import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exercise } from '../../../exercices/domain/entities/exercise.entity';
import { Event } from '../../../event/domain/entities/event.entity';

@Entity()
export class Language {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @OneToMany(() => Exercise, (exercise) => exercise.language)
  exercises: Exercise[];
  @OneToMany(() => Event, (event) => event.language)
  events: Event[];
  @CreateDateColumn()
  createdAt: Date;
}
