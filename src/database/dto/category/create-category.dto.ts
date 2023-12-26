import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: "The name of category"})
    name: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: "The base64 string of image file"})
    icon: string;
}