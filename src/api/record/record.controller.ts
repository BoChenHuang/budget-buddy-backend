import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Query, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RecordService } from './record.service';
import mongoose from 'mongoose';
import { CreateRecordDto } from 'src/database/dto/record/create-record.dto';
import { UpdateRecordDto } from 'src/database/dto/record/update-record.dto';

@ApiBearerAuth()
@ApiTags('record')
@Controller('api/record')
export class RecordController {
    constructor(
        private readonly recordService: RecordService,
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
    @ApiQuery({name: 'start', required: false, description: 'The start day of record'})
    @ApiQuery({name: 'end', required: false, description: 'The end day of record'})
    @Get('/:ledgerId')
    async getRecordsOfLedger(
        @Request() req, 
        @Param('ledgerId') ledgerId: string, 
        @Query('start') start?: string, 
        @Query('end') end?: string) {
        if (mongoose.Types.ObjectId.isValid(ledgerId)) {
            if (ledgerId) {
                if(start) {
                    if(end)
                        return this.recordService.getRecordsOfLedger(ledgerId, {start, end})
                    else {
                        const today = new Date().toString()
                        return this.recordService.getRecordsOfLedger(ledgerId, {start: start, end: today})
                    }
                } else
                    return this.recordService.getRecordsOfLedger(ledgerId);
            }
            else
                return null;
        } else
            return new BadRequestException(`${ledgerId} is invalid.`);
    }

    @Post('/create')
    async createRecord(@Body() createRecordDto: CreateRecordDto) {
        return await this.recordService.createRecord(createRecordDto);
    }

    @ApiParam({name: 'id', required: true, description: 'The id of record'})
    @Delete('/delete/:id')
    async delete(@Request() req, @Param('id') id) {
        if (id) {
            if (mongoose.Types.ObjectId.isValid(id)) {
                await this.recordService.deleteRecord(id)
                return 'Sucess!'
            } else
                return new BadRequestException(`${id} is invalid.`)
        }
        return
    }

    @Patch('/update')
    async update(@Request() req, @Body() updateRecordDto: UpdateRecordDto) {
        return this.recordService.updateRecord(updateRecordDto)
    }
}
