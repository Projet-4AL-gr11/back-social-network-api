import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Language } from '../../../language/domain/entities/language.entity';
import { Event } from '../../../event/domain/entities/event.entity';
import {Leaderboard} from "../../../leaderboard/domain/entities/leaderboard.entity";
import {IsDate} from "class-validator";

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Event, (event) => event.exercises)
  events: Event[];

  @OneToMany(() => Leaderboard, (leaderboard) => leaderboard.exercise, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  leaderboards: Leaderboard[];

  @Column()
  @IsDate()
  startingDate: Date;

  @Column()
  @IsDate()
  endingDate: Date;
}
