import { BadRequestException, Body, Controller, Get, Param, Patch, Post, Query, Request } from '@nestjs/common';
import { CreditCardService } from './credit-card.service';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { CreateCreditCardDto } from 'src/database/dto/credit-card/create-credit-card.dto';
import { UpdateCreditCardDto } from 'src/database/dto/credit-card/update-credit-card.dto';

@ApiBearerAuth()
@ApiTags("credit-card")
@Controller('api/credit-card')
export class CreditCardController {
    constructor(
        private readonly creditCardService: CreditCardService
    ){}
    
    @ApiQuery({name: 'id', required: true, description: 'The id of credit card'})
    @Get()
    async getCreditCardById(@Query('id') id: string) {
        if (mongoose.Types.ObjectId.isValid(id)) {
            if (id)
                return this.creditCardService.getCreditCardById(id);
            else
                return null;
        } else
            return new BadRequestException(`${id} is invalid.`);
    }

    @ApiParam({name: 'ledgerId', required: true, description: 'The id of ledger'})
    @Get('/:ledgerId')
    async getCreditCardsOfLedger(@Param('ledgerId') ledgerId: string) {
        if (mongoose.Types.ObjectId.isValid(ledgerId)) {
            if (ledgerId)
                return this.creditCardService.getCreditCardsByLedgerId(ledgerId);
            else
                return null;
        } else
            return new BadRequestException(`${ledgerId} is invalid.`);
    }

    @Post('/create')
    async createCreditCard(@Body() createCreditCardDto: CreateCreditCardDto) {
        const creditCard = this.creditCardService.create(createCreditCardDto);
        return creditCard;
    }

    @Patch('/update')
    async updateFund(@Body() updateCreditCardDto: UpdateCreditCardDto) {
        return this.creditCardService.update(updateCreditCardDto)
    }
}
