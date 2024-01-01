import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateFundDto {
    @IsMongoId()
    @IsNotEmpty()
    @ApiProperty({description: "The id of ledger"})
    ledgerId: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: "The name of fund"})
    name: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({description: "The deposit of fund"})
    deposit: number;
}