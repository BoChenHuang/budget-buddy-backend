import { IsArray, IsMongoId, ValidateIf } from "class-validator";

export class UpdateSettingDto {
    @IsArray()
    @IsMongoId({each: true})
    @ValidateIf((object) => object.categories !== undefined)
    categories: string[] | undefined;
}