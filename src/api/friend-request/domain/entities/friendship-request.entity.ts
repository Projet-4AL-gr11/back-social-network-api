import { CreateDateColumn, Entity, ManyToOne } from 'typeorm';
import { User } from '../../../user/domain/entities/user.entity';

@Entity()
export class FriendRequest {
  @ManyToOne(() => User, (user) => user, {
    primary: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  sender: User;
  @ManyToOne(() => User, (user) => user, { primary: true, onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
