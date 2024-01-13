import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCurrencyDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: "The name of currency"})
    name: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({description: "The exchangeRate of currency"})
    exchangeRate: number;
}