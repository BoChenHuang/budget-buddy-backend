import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrencyService } from './currency.service';
import { CreateCurrencyDto } from 'src/database/dto/currency/create-currency.dto';
import { LedgerService } from '../ledger/ledger.service';

@ApiBearerAuth()
@ApiTags('currency')
@Controller('api/currency')
export class CurrencyController {
    constructor(
        private readonly currencyService: CurrencyService, 
    ){}

    @Get()
    async getAllCurrency() {
        return this.currencyService.getAllCurrency();
    }

    @Post('/create')
    async createCurrency(@Body() createCurrencyDto: CreateCurrencyDto) {
        return this.currencyService.createCurrency(createCurrencyDto);
    }
}
