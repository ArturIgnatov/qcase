import { IsNotEmpty } from 'class-validator';
import { Errors } from '../../../interfaces/errors';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: Errors.FIELD_IS_EMPTY })
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: Errors.FIELD_IS_EMPTY })
  password: string;
}
