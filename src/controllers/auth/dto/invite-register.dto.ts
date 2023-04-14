import { IsNotEmpty, MinLength } from 'class-validator';
import { Errors } from '../../../interfaces/errors';
import { ApiProperty } from '@nestjs/swagger';

export class InviteRegisterDto {
  @ApiProperty({ required: true })
  @MinLength(3)
  @IsNotEmpty({ message: Errors.FIELD_IS_EMPTY })
  fname: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: Errors.FIELD_IS_EMPTY })
  @MinLength(30)
  inviteCode: string;

  @ApiProperty({ required: true })
  @MinLength(6, { message: Errors.PASSWORD_IS_SHORTS })
  @IsNotEmpty({ message: Errors.FIELD_IS_EMPTY })
  password: string;
}
