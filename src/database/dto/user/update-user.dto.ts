import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, ValidateIf } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    @ValidateIf((object) => object.name !== undefined)
    @ApiPropertyOptional({ description: 'The name of a user' })
    name: string | undefined;

    @IsString()
    @IsNotEmpty()
    @MaxLength(15)
    @ValidateIf((object) => object.password !== undefined)
    @ApiPropertyOptional({ description: 'The password of a user' })
    password: string | undefined;
}