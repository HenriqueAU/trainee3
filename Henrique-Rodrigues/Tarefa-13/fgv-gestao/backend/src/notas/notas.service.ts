import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Nota } from './notas.entity';
import { Repository } from 'typeorm';
import { CreateNotaDto } from './dtos/create-nota.dto';
import { UpdateNotaDto } from './dtos/update-nota.dto';
import { Aluno } from 'src/alunos/alunos.entity';

@Injectable()
export class NotaService {
  constructor(
    @InjectRepository(Nota)
    private notasRepository: Repository<Nota>,
    @InjectRepository(Aluno)
    private alunoRepository: Repository<Aluno>,
  ) {}

  async findAllByAluno(alunoId: number): Promise<Nota[]> {
    const aluno = await this.alunoRepository.findOneBy({ id: alunoId });
    const nota = await this.notasRepository.find({
      where: { aluno: { id: alunoId } },
    });
    if (aluno === null) {
      throw new NotFoundException('Registro não encontrado', {
        cause: new Error(),
        description: 'O aluno não foi encontrado',
      });
    }
    if (nota.length === 0) {
      throw new NotFoundException('Registro não encontrado', {
        cause: new Error(),
        description: `Nenhuma nota foi encontrada para ${alunoId}`,
      });
    }
    return nota;
  }

  async createNota(createNotaDto: CreateNotaDto): Promise<Nota> {
    const aluno = await this.alunoRepository.findOneBy({
      id: createNotaDto.alunoId,
    });
    if (aluno === null) {
      throw new NotFoundException('Aluno não encontrato', {
        cause: new Error(),
        description: `Nenhum aluno com o id ${createNotaDto.alunoId} foi encontrato`,
      });
    }
    const nota = this.notasRepository.create({ ...createNotaDto, aluno });
    await this.notasRepository.save(nota);
    return nota;
  }

  async updateNota(updateNotaDto: UpdateNotaDto, id: number): Promise<Nota> {
    const nota = await this.notasRepository.findOneBy({ id });
    if (nota === null) {
      throw new NotFoundException('Registro não encontrado', {
        cause: new Error(),
        description: `Nota ${id} não existe`,
      });
    }
    await this.notasRepository.update({ id }, updateNotaDto);
    return nota;
  }
}
