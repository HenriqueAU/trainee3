import { IsNumber, IsOptional } from 'class-validator';

export class CreateNotaDto {
  @IsNumber()
  alunoId: number;

  @IsNumber()
  ano: number;

  @IsNumber()
  mes: number;

  @IsNumber()
  @IsOptional()
  notaSemana1: number;

  @IsNumber()
  @IsOptional()
  notaSemana2: number;

  @IsNumber()
  @IsOptional()
  notaSemana3: number;

  @IsNumber()
  @IsOptional()
  notaSemana4: number;
}
