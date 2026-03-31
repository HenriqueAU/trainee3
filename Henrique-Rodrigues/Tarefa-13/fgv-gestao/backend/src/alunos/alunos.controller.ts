import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Aluno } from './alunos.entity';
import { AlunoService } from './alunos.service';
import { CreateAlunoDto } from './dtos/create-aluno.dto';
import { UpdateAlunoDto } from './dtos/update-aluno.dto';

@Controller('alunos')
export class AlunoController {
  constructor(private alunoService: AlunoService) {}

  @Get()
  findAll(): Promise<Aluno[]> {
    return this.alunoService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Aluno> {
    return this.alunoService.findOne(id);
  }

  @Post()
  async createAluno(@Body() createAlunoDto: CreateAlunoDto) {
    return this.alunoService.createAluno(createAlunoDto);
  }

  @Patch(':id')
  async uptadeAluno(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAlunoDto: UpdateAlunoDto,
  ) {
    return this.alunoService.updateAluno(updateAlunoDto, id);
  }

  @Delete(':id')
  async deleteAluno(@Param('id', ParseIntPipe) id: number) {
    return this.alunoService.removeAluno(id);
  }
}
