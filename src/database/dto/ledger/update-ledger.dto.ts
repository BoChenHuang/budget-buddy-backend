import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsMongoId, IsNotEmpty, IsString, ValidateIf } from "class-validator";

export class UpdateLedgerDto {
    @IsMongoId()
    @IsNotEmpty()
    @ApiProperty({description: "The id of ledger"})
    ledgerId: string

    @IsString()
    @ValidateIf((object) => object.name !== undefined)
    @ApiPropertyOptional({description: "The name of ledger"})
    name: string | undefined;

    @IsString()
    @ValidateIf((object) => object.image !== undefined)
    @ApiPropertyOptional({description: "The base64 string of image"})
    image: string | undefined;

    @IsString()
    @ValidateIf((object) => object.description !== undefined)
    @ApiPropertyOptional({description: "The description of ledger"})
    description: string | undefined;

    @IsArray()
    @IsMongoId({each: true})
    @ValidateIf((object) => object.collaborators !== undefined)
    @ApiPropertyOptional({description: "The collaborators id of ledger"})
    collaborators: string[] | undefined;

    @IsMongoId()
    @ValidateIf((object) => object.currency !== undefined)
    @ApiPropertyOptional({description: "The currency id of ledger"})
    currency: string | undefined;

    @IsMongoId()
    @ValidateIf((object) => object.theme !== undefined)
    @ApiPropertyOptional({description: "The theme id of ledger"})
    theme: string | undefined;
}