import { IsArray, IsMongoId, IsNotEmpty, IsString, ValidateIf } from "class-validator";

export class UpdateLedgerDto {
    @IsMongoId()
    @IsNotEmpty()
    ledgerId: string

    @IsString()
    @ValidateIf((object) => object.name !== undefined)
    name: string | undefined;

    @IsString()
    @ValidateIf((object) => object.image !== undefined)
    image: string | undefined;

    @IsString()
    @ValidateIf((object) => object.description !== undefined)
    description: string | undefined;

    @IsArray()
    @IsMongoId({each: true})
    @ValidateIf((object) => object.collaborators !== undefined)
    collaborators: string[] | undefined;

    @IsMongoId()
    @ValidateIf((object) => object.currency !== undefined)
    currency: string | undefined;

    @IsMongoId()
    @ValidateIf((object) => object.theme !== undefined)
    theme: string | undefined;
}