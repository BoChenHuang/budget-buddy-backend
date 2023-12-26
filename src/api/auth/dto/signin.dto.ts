import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class SignInDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ description: 'The email of a user' })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(15)
    @ApiProperty({ description: 'The password of a user', maximum: 15 })
    password: string;
}