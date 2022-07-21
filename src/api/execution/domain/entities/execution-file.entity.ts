import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Leaderboard } from './leaderboard.entity';

@Entity()
export class ExecutionFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  public key: string;

  @Column()
  executionId: string;

  @JoinColumn()
  @OneToOne(() => Leaderboard, (leaderboard) => leaderboard.userEntryFile)
  leaderboard: Leaderboard;
}
