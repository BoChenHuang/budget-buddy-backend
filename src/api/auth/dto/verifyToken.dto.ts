import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class VerifyTokenDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'The token of a user' })
  token: string;
}
