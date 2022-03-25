import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../../user/domain/entities/user.entity';
import { Event } from '../../../event/domain/entities/event.entity';
import { Group } from '../../../group/domain/entities/group.entity';

@Entity()
export class Media {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  public key: string;

  @OneToOne(() => User, (user) => user.profilePicture, { onDelete: 'CASCADE' })
  userProfilePicture: User;
  @OneToOne(() => User, (user) => user.bannerPicture, { onDelete: 'CASCADE' })
  userBanner: User;

  @OneToOne(() => Event, (event) => event.picture, { onDelete: 'CASCADE' })
  eventPicture: Event;

  @OneToOne(() => Group, (group) => group.picture, { onDelete: 'CASCADE' })
  groupPicture: Group;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
}
