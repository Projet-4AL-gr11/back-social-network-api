import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../../user/domain/entities/user.entity';
import { Post } from '../../../post/domain/entities/post.entity';
import { Length } from 'class-validator';
import { Media } from '../../../media/domain/entities/media.entity';
import { Report } from '../../../report/domain/entities/report.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => User, (user) => user.comments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  creator: User;
  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  post: Post;
  @Length(0, 512)
  @Column()
  text: string;
  @OneToMany(() => Media, (media) => media.comments, {
    cascade: true,
    eager: true,
    onDelete: 'SET NULL',
  })
  medias: Media[];
  @OneToMany(() => Report, (report) => report.reportedComment, {
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
