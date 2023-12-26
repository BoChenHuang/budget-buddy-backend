import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsMongoId, ValidateIf } from "class-validator";

export class UpdateSettingDto {
    @IsArray()
    @IsMongoId({each: true})
    @ValidateIf((object) => object.categories !== undefined)
    @ApiPropertyOptional({ description: 'The categories id of a user' })
    categories: string[] | undefined;
}