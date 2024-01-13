import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsMongoId, IsNotEmpty } from "class-validator";

export class SetFundLockDto {
    @IsMongoId()
    @IsNotEmpty()
    @ApiProperty({description: "The id of ledger"})
    fundId: string

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({description: "The lock of fund"})
    lock: boolean;
}