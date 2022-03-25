import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Language } from '../../../language/domain/entities/language.entity';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Language, (language) => language.exercises, {
    nullable: false,
    eager: true,
  })
  language: Language;
}
