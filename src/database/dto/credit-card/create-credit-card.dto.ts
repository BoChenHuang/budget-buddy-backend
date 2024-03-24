import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateCreditCardDto {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ description: 'The id of ledger' })
  ledgerId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of credit card' })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'The limit of credit card' })
  limit: number;

  @IsDateString()
  @ApiProperty({ description: 'The statement closing date of credit card' })
  statementClosingDate: Date;

  @IsDateString()
  @ApiProperty({ description: 'The due date of credit card' })
  dueDate: Date;
}
