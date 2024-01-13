import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString, ValidateIf } from "class-validator";

export class CreateLedgerDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: "The name of ledger"})
    name: string;

    @IsString()
    @ValidateIf((object) => object.image !== undefined)
    @ApiPropertyOptional({description: "The base64 string of image file"})
    image: string;

    @IsString()
    @ValidateIf((object) => object.description !== undefined)
    @ApiPropertyOptional({description: "The description of ledger"})
    description: string;
}