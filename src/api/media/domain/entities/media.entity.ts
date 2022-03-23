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

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
}
