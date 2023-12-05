import { BadRequestException, Body, Controller, Get, Param, Post, Query, Request } from '@nestjs/common';
import { GetLedgersOfUserDto } from 'src/database/dto/ledger/get-ledgers-of-user.dto';
import { LedgerService } from './ledger.service';
import { CreateLedgerDto } from 'src/database/dto/ledger/create-ledger.dto';
import { IsMongoId } from 'class-validator';
import { DeleteLedgerDto } from 'src/database/dto/ledger/delete-ledger.dto';
import mongoose, { Mongoose } from 'mongoose';
import { UpdateLedgerDto } from 'src/database/dto/ledger/update-ledger.dto';

@Controller('api/ledger')
export class LedgerController {
    constructor(private readonly ledgerService: LedgerService) { }
    @Get()
    getLedgers(@Request() req, @Query('id') id?: string) {
        if (id) {
            if (mongoose.Types.ObjectId.isValid(id)) {
                if (id)
                    return this.ledgerService.getLedgerById(id)
                else
                    return null
            } else
                return new BadRequestException(`${id} is invalid.`)
        } else {
            const dto: GetLedgersOfUserDto = { userId: req.user.id }
            return this.ledgerService.getLedger(dto)
        }
    }

    @Post('/create')
    create(@Request() req, @Body() body: CreateLedgerDto) {
        const dto = { userId: req.user.id, ...body }
        return this.ledgerService.create(dto)
    }

    @Post('/delete')
    async delete(@Request() req, @Body() body: DeleteLedgerDto) {
        const dto = { userId: req.user.id, ...body }
        await this.ledgerService.delete(dto)
        return 'Sucess!'
    }

    @Post('/update')
    async update(@Request() req, @Body() body: UpdateLedgerDto) {
        const dto = { userId: req.user.id, ...body }
        return this.ledgerService.update(dto)
    }
}
