import { BadRequestException, Body, Controller, Get, Param, Patch, Post, Query, Request } from '@nestjs/common';
import { FundService } from './fund.service';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { CreateFundDto } from 'src/database/dto/fund/create-fund.dto';
import { UpdateFundDto } from 'src/database/dto/fund/update-fund.dto';

@ApiBearerAuth()
@ApiTags('fund')
@Controller('api/fund')
export class FundController {
    constructor(
        private readonly fundService: FundService
    ){}

    @ApiQuery({name: 'id', required: true, description: 'The id of fund'})
    @Get()
    async getFundById(@Request() req, @Query('id') id: string) {
        if (mongoose.Types.ObjectId.isValid(id)) {
            if (id)
                return this.fundService.getFundById(id);
            else
                return null;
        } else
            return new BadRequestException(`${id} is invalid.`);
    }

    @ApiParam({name: 'ledgerId', required: true, description: 'The id of ledger'})
    @Get('/:ledgerId')
    async getFundsOfLedger(@Request() req, @Param('ledgerId') ledgerId: string) {
        if (mongoose.Types.ObjectId.isValid(ledgerId)) {
            if (ledgerId)
                return this.fundService.getFundsByLedgerId(ledgerId);
            else
                return null;
        } else
            return new BadRequestException(`${ledgerId} is invalid.`);
    }

    @Post('/create')
    async createFund(@Body() createFundDto: CreateFundDto) {
        return this.fundService.create(createFundDto)
    }

    @Patch('/update')
    async updateFund(@Body() updateFundDto: UpdateFundDto) {
        return this.fundService.update(updateFundDto);
    }
}
