import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { IsAValidName } from 'src/validator/users.validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  @IsString()
  @Length(2, 50)
  @IsAValidName()
  readonly name: string;
  @IsNotEmpty({ message: 'Email não pode ser vazio' })
  @IsEmail({}, { message: 'Precisa ser um email com formato válido' })
  readonly email: string;
  //TO DO "senha"
  //TO DO "ativo"
}
