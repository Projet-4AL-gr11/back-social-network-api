import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';
import { User } from '../../../user/domain/entities/user.entity';
import { Group } from './group.entity';

@Entity()
export class GroupMembership {
  @ManyToOne(() => User, (user) => user.groups, {
    primary: true,
    onDelete: 'CASCADE',
  })
  user: User;
  @ManyToOne(() => Group, (group) => group.members, { primary: true })
  group: Group;
  @Column({ default: false, nullable: false })
  isAdmin: boolean;
  @Column({ default: false, nullable: false })
  isOwner: boolean;
  @CreateDateColumn()
  createdAt: Date;
}
