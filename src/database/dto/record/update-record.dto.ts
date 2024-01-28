import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsEnum, IsIn, IsMongoId, IsNotEmpty, IsNumber, IsString, ValidateIf } from "class-validator";

const opTypes = ['income', 'expenditure', 'transfer'] as const;
export type OperationType = typeof opTypes[number];

const scType = ['Fund', 'CreditCard'] as const;
export type SourceType = typeof scType[number];

export class UpdateRecordDto {
    @IsMongoId()
    @IsNotEmpty()
    @ApiProperty({description: "The id of record"})
    recordId: string;

    @IsString()
    @ValidateIf((object) => object.name !== undefined)
    @ApiProperty({description: "The name of record"})
    name: string;

    @IsMongoId()
    @ValidateIf((object) => object.currency !== undefined)
    @ApiProperty({description: "The id of currency"})
    currency: string;

    @IsArray()
    @IsMongoId({each: true})
    @ValidateIf((object) => object.categories !== undefined)
    @ApiPropertyOptional({ description: 'The array of categories' })
    categories: string[];

    @IsString()
    @ValidateIf((object) => object.description !== undefined)
    @ApiProperty({description: "The description of record"})
    description: string;

    @IsNumber()
    @ValidateIf((object) => object.amount !== undefined)
    @ApiProperty({description: "The amount of record"})
    amount: number;
}