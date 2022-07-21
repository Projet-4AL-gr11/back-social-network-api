import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../../user/domain/entities/user.entity';
import { Exercise } from '../../../exercices/domain/entities/exercise.entity';
import { Language } from '../../../language/domain/entities/language.entity';

@Entity()
export class Leaderboard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userEntry: string;

  @Column({ nullable: true })
  timerScore: number;

  @CreateDateColumn()
  createdDate: Date;

  @ManyToOne(() => User, (user) => user.leaderboards, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Exercise, (exercise) => exercise.leaderboards, {
    onDelete: 'CASCADE',
  })
  exercise: Exercise;

  @ManyToOne(() => Language, (language) => language.leaderboards)
  language: Language;

  @Column({ default: 0 })
  ranking: number;
}
