import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../../user/domain/entities/user.entity';
import { Exercise } from '../../../exercices/domain/entities/exercise.entity';
import { Language } from '../../../language/domain/entities/language.entity';
import { Event } from '../../../event/domain/entities/event.entity';

@Entity()
export class Leaderboard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userEntry: string;

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
