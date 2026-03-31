import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Aluno } from './alunos.entity';
import { Repository } from 'typeorm';
import { CreateAlunoDto } from './dtos/create-aluno.dto';
import { UpdateAlunoDto } from './dtos/update-aluno.dto';

@Injectable()
export class AlunoService {
  constructor(
    @InjectRepository(Aluno)
    private alunosRepository: Repository<Aluno>,
  ) {}

  findAll(): Promise<Aluno[]> {
    return this.alunosRepository.find();
  }

  async findOne(id: number): Promise<Aluno> {
    const aluno = await this.alunosRepository.findOneBy({ id });
    if (aluno === null) {
      throw new NotFoundException('Registro não encontrado', {
        cause: new Error(),
        description: `Aluno ${id} não existe`,
      });
    }
    return aluno;
  }

  async createAluno(createAlunoDto: CreateAlunoDto): Promise<Aluno> {
    const aluno = this.alunosRepository.create(createAlunoDto);
    await this.alunosRepository.save(aluno);
    return aluno;
  }

  async updateAluno(
    updateAlunoDto: UpdateAlunoDto,
    id: number,
  ): Promise<Aluno> {
    const aluno = await this.alunosRepository.findOneBy({ id });
    if (aluno === null) {
      throw new NotFoundException('Registro não encontrado', {
        cause: new Error(),
        description: `Aluno ${id} não existe`,
      });
    }
    await this.alunosRepository.update({ id }, updateAlunoDto);
    return aluno;
  }

  async removeAluno(id: number): Promise<void> {
    const aluno = await this.alunosRepository.findOneBy({ id });
    if (aluno === null) {
      throw new NotFoundException('Registro não econtrado', {
        cause: new Error(),
        description: `Aluno ${id} não existe`,
      });
    }
    await this.alunosRepository.delete(id);
  }
}
