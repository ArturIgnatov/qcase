import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Errors } from '../../../interfaces/errors';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: Errors.FIELD_IS_EMPTY })
  fname: string;

  @ApiProperty({ required: false })
  lname?: string;

  @ApiProperty({ required: true })
  @IsEmail(undefined, { message: Errors.BAD_EMAIL })
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: Errors.FIELD_IS_EMPTY })
  @MinLength(6, { message: Errors.PASSWORD_IS_SHORTS })
  password: string;
}
