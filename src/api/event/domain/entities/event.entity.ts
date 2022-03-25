import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
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

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Length(5, 50)
  @Column({ nullable: false, length: 50 })
  name: string;
  @IsOptional()
  @MaxLength(200)
  @Column({ nullable: false, length: 200 })
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

  @ManyToOne(() => Language, (language) => language.events, {
    nullable: false,
    eager: true,
  })
  language: Language;

  @OneToOne(() => Media, (media) => media.eventPicture, {
    cascade: true,
    nullable: true,
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  picture: Media;

  @CreateDateColumn()
  createdAt: Date;
}
