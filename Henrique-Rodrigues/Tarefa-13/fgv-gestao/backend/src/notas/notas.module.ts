import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nota } from './notas.entity';
import { NotaController } from './notas.controller';
import { NotaService } from './notas.service';
import { Aluno } from 'src/alunos/alunos.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Nota]),
    TypeOrmModule.forFeature([Aluno]),
  ],
  controllers: [NotaController],
  providers: [NotaService],
})
export class NotaModule {}
