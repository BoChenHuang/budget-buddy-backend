import { IsMongoId, IsNotEmpty, IsString, ValidateIf } from "class-validator";

export class CreateLedgerDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    image: string;

    @IsString()
    description: string;
}