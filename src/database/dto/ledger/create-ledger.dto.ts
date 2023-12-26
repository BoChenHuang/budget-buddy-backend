import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString, ValidateIf } from "class-validator";

export class CreateLedgerDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: "The name of ledger"})
    name: string;

    @IsString()
    @ApiPropertyOptional({description: "The base64 string of image file"})
    image: string;

    @IsString()
    @ApiPropertyOptional({description: "The description of ledger"})
    description: string;
}