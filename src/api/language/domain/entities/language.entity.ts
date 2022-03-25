import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exercise } from '../../../exercices/domain/entities/exercise.entity';

@Entity()
export class Language {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @OneToMany(() => Exercise, (exercise) => exercise.language)
  exercises: Exercise[];
  @CreateDateColumn()
  createdAt: Date;
}
