import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../../user/domain/entities/user.entity';
import { Event } from '../../../event/domain/entities/event.entity';

@Entity()
export class EventRanking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.eventRanking)
  user: User;

  @ManyToOne(() => Event, (event) => event.eventRanking)
  event: Event;

  @Column({ default: 0 })
  score: number;
}
