import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Execute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  execution_id: number;

  @Column()
  language: string;

  @Column()
  code: string;

  @Column()
  code_result: string;

  @Column()
  result: string;

  /*
  id
  cod
  language
  result?



  post => id cod lang => api python  RUN docker...... => result
  get => api/code/id.result  => hello







  front =>>> Service relié a PYTHON
  get => python.get
  Post => python.post


  run => crée un id, recup lang   => ca envoi le code
  Get.code.id.result



   */

}
