import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { User } from '../../../user/domain/entities/user.entity';

@Entity()
export class Friendship {
  @ManyToOne(() => User, (user) => user.friendsOne, {
    primary: true,
    onDelete: 'CASCADE',
  })
  friendOne: User;
  @ManyToOne(() => User, (user) => user.friendsTwo, {
    primary: true,
    onDelete: 'CASCADE',
  })
  friendTwo: User;
}
