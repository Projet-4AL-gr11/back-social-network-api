import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Language} from "../../../language/domain/entities/language.entity";

@Entity()
export class ExerciseTemplate {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => Language, (language) => language.exerciseTemplates, {
        nullable: false,
        eager: true,
    })
    language: Language;
}
