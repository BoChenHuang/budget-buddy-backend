import { IsMongoId, IsNotEmpty, IsString, ValidateIf } from "class-validator";

export class UpdateCategoryDto {
    @IsMongoId()
    @IsNotEmpty()
    categoryId: string

    @IsString()
    @ValidateIf((object) => object.name !== undefined)
    name: string;
    
    @IsString()
    @ValidateIf((object) => object.icon !== undefined)
    icon: string;
}