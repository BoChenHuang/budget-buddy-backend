import { IsMongoId, IsNotEmpty } from "class-validator";

export class GetLedgersOfUserDto {
    @IsMongoId()
    @IsNotEmpty()
    userId: string;
}