import { BadRequestException, Controller, Get, Param, Query, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RecordService } from './record.service';
import mongoose from 'mongoose';

@ApiBearerAuth()
@ApiTags('record')
@Controller('api/record')
export class RecordController {
    constructor(
        private readonly recordService: RecordService
    ){}

    @ApiQuery({name: 'id', required: true, description: 'The id of record'})
    @Get()
    async getRecord(@Request() req, @Query('id') id: string) {
        if (mongoose.Types.ObjectId.isValid(id)) {
            if (id)
                return this.recordService.getRecordById(id)
            else
                return null;
        } else
            return new BadRequestException(`${id} is invalid.`);
    }

    @ApiParam({name: 'ledgerId', required: true, description: 'The id of ledger'})
    @Get('/:ledgerId')
    async getRecordsOfLedger(@Request() req, @Param('ledgerId') ledgerId: string) {
        if (mongoose.Types.ObjectId.isValid(ledgerId)) {
            if (ledgerId)
                return this.recordService.getRecordsOfLedger(ledgerId);
            else
                return null;
        } else
            return new BadRequestException(`${ledgerId} is invalid.`);
    }
}
