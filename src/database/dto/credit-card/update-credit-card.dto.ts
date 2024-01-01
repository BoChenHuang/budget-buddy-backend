import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsMongoId, IsNotEmpty, IsNumber, IsString, ValidateIf } from "class-validator";

export class UpdateCreditCardDto {
    @IsMongoId()
    @IsNotEmpty()
    @ApiProperty({description: "The id of credit card"})
    creditCardId: string

    @IsString()
    @ValidateIf((object) => object.name !== undefined)
    @ApiProperty({description: "The name of credit card"})
    name: string;

    @IsNumber()
    @ValidateIf((object) => object.limit !== undefined)
    @ApiProperty({description: "The limit of credit card"})
    limit: number;

    @IsDateString()
    @ValidateIf((object) => object.statementClosingDate !== undefined)
    @ApiProperty({description: "The statement closing date of credit card"})
    statementClosingDate: Date;

    @IsDateString()
    @ValidateIf((object) => object.dueDate !== undefined)
    @ApiProperty({description: "The due date of credit card"})
    dueDate: Date
}