import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsMongoId, IsNotEmpty } from "class-validator"

export class SetCreditCardLockDto {
    @IsMongoId()
    @IsNotEmpty()
    @ApiProperty({description: "The id of credit card"})
    creditCardId: string

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({description: "The lock of credit card"})
    lock: boolean
}