import { IsMongoId, IsNotEmpty } from "class-validator";

export class DeleteLedgerDto {
    @IsMongoId()
    @IsNotEmpty()
    ledgerId: string
}