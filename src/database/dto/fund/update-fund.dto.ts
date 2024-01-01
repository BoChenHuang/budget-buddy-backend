import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsNumber, IsString, ValidateIf } from "class-validator";


export class UpdateFundDto {
    @IsMongoId()
    @IsNotEmpty()
    @ApiProperty({description: "The id of fund"})
    fundId: string

    @IsString()
    @ValidateIf((object) => object.name !== undefined)
    @ApiProperty({description: "The name of fund"})
    name: string;

    @IsNumber()
    @ValidateIf((object) => object.deposit !== undefined)
    @ApiProperty({description: "The deposit of fund"})
    deposit: number;
}