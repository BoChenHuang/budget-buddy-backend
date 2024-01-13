import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsEnum, IsIn, IsMongoId, IsNotEmpty, IsNumber, IsString, ValidateIf } from "class-validator";

const opTypes = ['income', 'expenditure', 'transfer'] as const;
export type OperationType = typeof opTypes[number];

const scType = ['Fund', 'CreditCard'] as const;
export type SourceType = typeof scType[number];

// enum OperationType {
//     income = 1,
//     expenditure = 2,
//     transfer = 3,
// }

// enum SourceType {
//     Found = 1,
//     CreditCard = 2,
// }

export class CreateRecordDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: "The name of record"})
    name: string;

    @IsMongoId()
    @IsNotEmpty()
    @ApiProperty({description: "The id of ledger"})
    ledgerId: string;

    @IsMongoId()
    @IsNotEmpty()
    @ApiProperty({description: "The id of currency"})
    currency: string;

    @IsArray()
    @IsMongoId({each: true})
    @ValidateIf((object) => object.categories !== undefined)
    @ApiPropertyOptional({ description: 'The array of categories' })
    categories: string[];

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: "The description of record"})
    description: string;

    @IsNotEmpty()
    @IsIn(opTypes)
    @ApiProperty({description: "The type of operation"})
    type: OperationType;

    @IsIn(scType)
    @ValidateIf((object) => object.type == 'expenditure')
    @IsNotEmpty()
    @ApiProperty({description: "The type of source"})
    sourceType: SourceType;

    @IsMongoId()
    @ValidateIf((object) => object.type == 'expenditure' || object.type == 'transfer')
    @ApiProperty({description: "The id of source"})
    source: string;

    @IsMongoId()
    @ValidateIf((object) => object.type == 'income' || object.type == 'transfer')
    @ApiProperty({description: "The id of destination"})
    destination: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({description: "The amount of record"})
    amount: number;
}