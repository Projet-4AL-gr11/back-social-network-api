import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../../user/domain/entities/user.entity';

@Entity()
class Message {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  public content: string;

  @ManyToOne(() => User, { eager: true })
  public author: User;

  @CreateDateColumn()
  public createdAt: Date;
}

export default Message;
