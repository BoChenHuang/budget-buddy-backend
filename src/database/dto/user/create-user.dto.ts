import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    @ApiProperty({ description: 'The name of a user', maxLength: 30 })
    name: string;


    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ description: 'The email of a user' })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(15)
    @ApiProperty({ description: 'The password of a user', maxLength: 15 })
    password: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'The verification  string' })
    verification : string;
}