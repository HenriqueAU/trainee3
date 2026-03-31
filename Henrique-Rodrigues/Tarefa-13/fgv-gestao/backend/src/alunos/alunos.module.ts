import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluno } from './alunos.entity';
import { AlunoController } from './alunos.controller';
import { AlunoService } from './alunos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Aluno])],
  controllers: [AlunoController],
  providers: [AlunoService],
})
export class AlunoModule {}
