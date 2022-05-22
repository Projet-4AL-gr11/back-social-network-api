import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Length } from 'class-validator';
import { User } from '../../../user/domain/entities/user.entity';
import { Group } from '../../../group/domain/entities/group.entity';
import { Post } from '../../../post/domain/entities/post.entity';
import { Event } from '../../../event/domain/entities/event.entity';
import { Comment } from '../../../comment/domain/entities/comment.entity';

@Entity()
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => User, (user) => user.reports, { onDelete: 'CASCADE' })
  userReporter: User;
  @Length(0, 500)
  @Column({ length: 500, nullable: false })
  text: string;
  @ManyToOne(() => User, (user) => user.reported, { onDelete: 'CASCADE' })
  reportedUser: User;
  @ManyToOne(() => Group, (group) => group.reported, { onDelete: 'CASCADE' })
  reportedGroup: Group;
  @ManyToOne(() => Post, (post) => post.reported, { onDelete: 'CASCADE' })
  reportedPost: Post;
  @ManyToOne(() => Event, (event) => event.reported, { onDelete: 'CASCADE' })
  reportedEvent: Event;
  @ManyToOne(() => Comment, (comment) => comment.reported, {
    onDelete: 'CASCADE',
  })
  reportedComment: Comment;
  @CreateDateColumn()
  createdAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
}
