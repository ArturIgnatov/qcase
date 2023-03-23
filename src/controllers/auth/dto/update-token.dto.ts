import { ApiProperty } from '@nestjs/swagger';

export class UpdateTokenDto {
  @ApiProperty({ required: true })
  refreshToken: string;
}
