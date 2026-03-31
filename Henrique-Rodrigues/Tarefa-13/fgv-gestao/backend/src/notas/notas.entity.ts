import { Aluno } from 'src/alunos/alunos.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Nota {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Aluno, (aluno) => aluno.notas, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  aluno: Aluno;

  @Column()
  ano: number;

  @Column()
  mes: number;

  @Column({ nullable: true })
  notaSemana1: number;

  @Column({ nullable: true })
  notaSemana2: number;

  @Column({ nullable: true })
  notaSemana3: number;

  @Column({ nullable: true })
  notaSemana4: number;
}
