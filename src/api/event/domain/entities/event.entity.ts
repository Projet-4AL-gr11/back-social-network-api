import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Group } from '../../../group/domain/entities/group.entity';
import { Language } from '../../../language/domain/entities/language.entity';
import {
  IsDate,
  IsDefined,
  IsOptional,
  Length,
  MaxLength,
} from 'class-validator';
import { User } from '../../../user/domain/entities/user.entity';
import { Media } from '../../../media/domain/entities/media.entity';
import { Exercise } from '../../../exercices/domain/entities/exercise.entity';
import { Post } from '../../../post/domain/entities/post.entity';
import { Report } from '../../../report/domain/entities/report.entity';
import { EventRanking } from '../../../leaderboard/domain/entities/event-ranking.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Length(5, 50)
  @Column({ nullable: false, length: 50 })
  name: string;
  @IsOptional()
  @MaxLength(500)
  @Column({ nullable: true, length: 500 })
  description: string;

  @IsDate()
  @IsDefined()
  @Column({ nullable: false })
  startDate: Date;
  @IsDate()
  @IsDefined()
  @Column({ nullable: false })
  endDate: Date;

  @Column({ nullable: false, default: -1 })
  participantsLimit: number;

  @ManyToOne(() => User, (user) => user.createdEvents)
  user: User;

  @ManyToOne(() => Group, (group) => group.events, { onDelete: 'SET NULL' })
  group: Group;

  @ManyToMany(() => User, (user) => user.eventsParticipation, {
    onDelete: 'CASCADE',
  })
  participants: User[];

  @ManyToMany(() => Language, (language) => language.events, {})
  languages: Language[];

  @OneToOne(() => Media, (media) => media.eventPicture, {
    cascade: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  picture: Media;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Exercise, (exercise) => exercise.event, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  exercises: Exercise[];

  @OneToMany(() => Post, (post) => post.sharedEvent, { onDelete: 'CASCADE' })
  posts: Post[];

  @OneToMany(() => Report, (report) => report.reportedEvent, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  reported: Report[];

  @OneToMany(() => EventRanking, (eventRanking) => eventRanking.event, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  eventRanking: EventRanking[];
}
