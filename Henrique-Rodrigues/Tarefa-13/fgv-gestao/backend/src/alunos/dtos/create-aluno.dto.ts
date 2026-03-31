import { Type } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';

export class CreateAlunoDto {
  @IsString()
  nome: string;

  @IsString()
  cpf: string;

  @IsString()
  nomePai: string;

  @IsString()
  nomeMae: string;

  @IsBoolean()
  necessidadesEspeciais: boolean;

  @Type(() => Date)
  dataEntrada: Date;
}
