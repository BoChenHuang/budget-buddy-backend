import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString, ValidateIf } from "class-validator";

export class UpdateCategoryDto {
    @IsMongoId()
    @IsNotEmpty()
    @ApiProperty({description: "The id of category"})
    categoryId: string

    @IsString()
    @ValidateIf((object) => object.name !== undefined)
    @ApiPropertyOptional({description: "The name of category"})
    name: string;
    
    @IsString()
    @ValidateIf((object) => object.icon !== undefined)
    @ApiPropertyOptional({description: "The base64 string of image file"})
    icon: string;
}