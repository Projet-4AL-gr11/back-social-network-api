import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Language } from '../../../language/domain/entities/language.entity';
import { Event } from '../../../event/domain/entities/event.entity';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Language, (language) => language.exercises, {
    nullable: false,
    eager: true,
  })
  language: Language;

  @ManyToMany(() => Event, (event) => event.exercises)
  events: Event[];


}
