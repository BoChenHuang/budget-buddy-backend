import { IsEmail, IsNotEmpty, IsString, MaxLength, ValidateIf } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    @ValidateIf((object) => object.name !== undefined)
    name: string | undefined;

    @IsString()
    @IsNotEmpty()
    @MaxLength(15)
    @ValidateIf((object) => object.password !== undefined)
    password: string | undefined;
}