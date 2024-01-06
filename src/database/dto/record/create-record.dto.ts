import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsString, ValidateIf } from "class-validator";

enum OperationType {
    income = 1,
    expenditure = 2,
    transfer = 3,
}

enum SourceType {
    Found = 1,
    CreditCard = 2,
}

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
    @IsEnum(OperationType)
    @ApiProperty({description: "The type of record"})
    type: OperationType;

    @IsEnum(SourceType)
    @ValidateIf((object) => object.sourceType !== undefined)
    @ApiProperty({description: "The type of source"})
    sourceType: SourceType;

    @IsMongoId()
    @ValidateIf((object) => object.source !== undefined)
    @ApiProperty({description: "The id of source"})
    source: string;

    @IsMongoId()
    @ValidateIf((object) => object.source !== undefined)
    @ApiProperty({description: "The id of destination"})
    destination: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({description: "The amount of record"})
    amount: string;
}