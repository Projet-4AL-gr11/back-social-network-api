import { CreateDateColumn, Entity, ManyToOne } from 'typeorm';
import { User } from '../../../user/domain/entities/user.entity';
import { Group } from './group.entity';

@Entity()
export class GroupRequest {
  @ManyToOne(() => Group, (group) => group.requestSend, {
    primary: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  group: Group;

  @ManyToOne(() => User, (user) => user.groupRequests, {
    primary: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
