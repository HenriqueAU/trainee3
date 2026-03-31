import { Nota } from 'src/notas/notas.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['cpf'])
export class Aluno {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Nota, (nota) => nota.aluno, {
    cascade: true,
  })
  notas: Nota[];

  @Column()
  nome: string;

  @Column()
  cpf: string;

  @Column()
  nomePai: string;

  @Column()
  nomeMae: string;

  @Column({ default: false })
  necessidadesEspeciais: boolean;

  @Column()
  dataEntrada: Date;
}
