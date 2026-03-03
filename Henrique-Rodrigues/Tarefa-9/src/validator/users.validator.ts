import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsAValidName(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsAValidName',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value === 'string' && /^[\p{L} ]+$/u.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} deve conter apenas letras, acentos e espaço`;
        },
      },
    });
  };
}
