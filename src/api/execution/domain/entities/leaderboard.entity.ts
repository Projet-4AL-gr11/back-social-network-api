import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../../user/domain/entities/user.entity';
import { Exercise } from '../../../exercices/domain/entities/exercise.entity';
import { Language } from '../../../language/domain/entities/language.entity';
import { ExecutionFile } from './execution-file.entity';

@Entity()
export class Leaderboard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => ExecutionFile, (executionFile) => executionFile.leaderboard)
  userEntryFile: ExecutionFile;

  @Column({ nullable: true })
  timerScore: number;

  @Column({ nullable: true, type: 'bigint' })
  executionId: number;

  @CreateDateColumn()
  createdDate: Date;

  @ManyToOne(() => User, (user) => user.leaderboards, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Exercise, (exercise) => exercise.leaderboards, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'exerciseId', referencedColumnName: 'id' })
  exercise: Exercise;

  @ManyToOne(() => Language, (language) => language.leaderboards)
  @JoinColumn()
  language: Language;

  @Column({ default: 0 })
  ranking: number;
}
