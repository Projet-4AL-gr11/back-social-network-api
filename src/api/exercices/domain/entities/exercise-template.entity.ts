import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Language } from '../../../language/domain/entities/language.entity';
import { Exercise } from './exercise.entity';

@Entity()
export class ExerciseTemplate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Language, (language) => language.exerciseTemplates, {
    nullable: false,
    eager: true,
  })
  language: Language;

  @OneToMany(() => Exercise, (exercise) => exercise.exerciseTemplate, {})
  exercises: Exercise[];
}
