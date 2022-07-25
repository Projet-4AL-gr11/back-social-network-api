import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../../user/domain/entities/user.entity';
import { Group } from '../../../group/domain/entities/group.entity';
import { Length } from 'class-validator';
import { Media } from '../../../media/domain/entities/media.entity';
import { Event } from '../../../event/domain/entities/event.entity';
import { Comment } from '../../../comment/domain/entities/comment.entity';
import { Report } from '../../../report/domain/entities/report.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => User, (user) => user.createdPosts, {
    eager: true,
    onDelete: 'CASCADE',
  })
  creator: User;
  @ManyToOne(() => Group, (group) => group.posts, { eager: true })
  group: Group;
  @ManyToOne(() => Event, (event) => event.posts, {
    eager: true,
    onDelete: 'SET NULL',
  })
  sharedEvent: Event;
  @OneToMany(() => Post, (post) => post.sharesPost, { onDelete: 'SET NULL' })
  sharedPosts: Post[];
  @ManyToOne(() => Post, (post) => post.sharedPosts, { onDelete: 'SET NULL' })
  sharesPost: Post;
  @ManyToMany(() => User, (user) => user.likedPosts, { onDelete: 'CASCADE' })
  likes: User[];
  @OneToMany(() => Comment, (comment) => comment.post, { cascade: true })
  comments: Comment[];

  @Length(0, 512)
  @Column({ nullable: true, length: 512 })
  text: string;

  @OneToMany(() => Media, (media) => media.post, {
    eager: true,
    cascade: true,
    onDelete: 'SET NULL',
  })
  medias: Media[];

  @OneToMany(() => Report, (report) => report.reportedPost, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  reported: Report[];

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
}
