import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, Param, Patch, Post, Query, Request } from '@nestjs/common';
import { GetLedgersOfUserDto } from 'src/database/dto/ledger/get-ledgers-of-user.dto';
import { LedgerService } from './ledger.service';
import { CreateLedgerDto } from 'src/database/dto/ledger/create-ledger.dto';
import mongoose from 'mongoose';
import { UpdateLedgerDto } from 'src/database/dto/ledger/update-ledger.dto';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('ledger')
@Controller('api/ledger')
export class LedgerController {
    constructor(private readonly ledgerService: LedgerService) { }
    @ApiQuery({name: 'id', required: false, description: 'The id of ledger'})
    @Get()
    getLedgers(@Request() req, @Query('id') id?: string) {
        if (id) {
            if (mongoose.Types.ObjectId.isValid(id)) {
                return this.ledgerService.getLedgerById(id)
            } else
                return new BadRequestException(`${id} is invalid.`)
        } else {
            const dto: GetLedgersOfUserDto = { userId: req.user.id }
            return this.ledgerService.getLedger(dto)
        }
    }

    @Post('/create')
    async create(@Request() req, @Body() body: CreateLedgerDto) {
        if(req.user.username == 'test') { // 測試帳號只能擁有一個 ledger
            const ledgerCount = (await this.ledgerService.getLedger({userId: req.user.id})).length
            if(ledgerCount >= 1)
                return new ForbiddenException('Test accounts are only allowed to have one ledger.')
        }
        const dto = { userId: req.user.id, ...body }
        return this.ledgerService.create(dto)
    }

    @ApiParam({name: 'id', required: true, description: 'The id of ledger'})
    @Delete('/delete/:id')
    async delete(@Request() req, @Param('id') id) {
        if (id) {
            if (mongoose.Types.ObjectId.isValid(id)) {
                await this.ledgerService.delete(id, req.user.id)
                return 'Sucess!'
            } else
                return new BadRequestException(`${id} is invalid.`)
        }
        return
    }

    @Patch('/update')
    async update(@Request() req, @Body() body: UpdateLedgerDto) {
        const dto = { userId: req.user.id, ...body }
        return this.ledgerService.update(dto)
    }
}
