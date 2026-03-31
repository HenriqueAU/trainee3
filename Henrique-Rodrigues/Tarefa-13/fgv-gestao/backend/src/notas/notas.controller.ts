import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { NotaService } from './notas.service';
import { Nota } from './notas.entity';
import { CreateNotaDto } from './dtos/create-nota.dto';
import { UpdateNotaDto } from './dtos/update-nota.dto';

@Controller('notas')
export class NotaController {
  constructor(private notaService: NotaService) {}

  @Get('alunos/:alunosId')
  async findByAluno(
    @Param('alunosId', ParseIntPipe) alunosId: number,
  ): Promise<Nota[]> {
    return this.notaService.findAllByAluno(alunosId);
  }

  @Post()
  async createNota(@Body() createNotaDto: CreateNotaDto) {
    return this.notaService.createNota(createNotaDto);
  }

  @Patch(':id')
  async uptadeNota(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNotaDto: UpdateNotaDto,
  ) {
    return this.notaService.updateNota(updateNotaDto, id);
  }
}
