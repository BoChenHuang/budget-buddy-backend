import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrencyService } from './currency.service';

@ApiBearerAuth()
@ApiTags('currency')
@Controller('api/currency')
export class CurrencyController {
    constructor(private readonly currencyService: CurrencyService){}

    @Get()
    async getAllCurrency() {
        return this.currencyService.getAllCurrency()
    }
}
