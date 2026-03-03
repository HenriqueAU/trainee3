import { PipeTransform, Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';

@Injectable()
export class PadronizeNamePipe implements PipeTransform<
  CreateUserDTO,
  CreateUserDTO
> {
  transform(value: CreateUserDTO): CreateUserDTO {
    if (typeof value.name !== 'string') {
      return value;
    }
    const lowerCaseWords = ['da', 'de', 'do', 'dos', 'das'];

    const padronizedName = value.name
      .trim()
      .replace(/\s+/g, ' ')
      .toLowerCase()
      .replace(/\b\p{L}/gu, (char) => char.toUpperCase());

    const refinedName = padronizedName
      .split(' ')
      .map((word) => {
        const lowerWord = word.toLowerCase();

        if (lowerCaseWords.includes(lowerWord)) {
          return lowerWord;
        }
        return word;
      })
      .join(' ');

    return {
      ...value,
      name: refinedName,
    };
  }
}
