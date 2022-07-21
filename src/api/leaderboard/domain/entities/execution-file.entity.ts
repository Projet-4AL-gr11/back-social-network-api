import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Leaderboard } from './leaderboard.entity';

@Entity()
export class ExecutionFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  public key: string;

  @Column()
  executionId: string;

  @OneToOne(() => Leaderboard, (leaderboard) => leaderboard.userEntryFile)
  leaderboard: Leaderboard;
}
