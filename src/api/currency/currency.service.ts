import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCurrencyDto } from 'src/database/dto/currency/create-currency.dto';
import { Currency } from 'src/database/schema/currency.schema';

@Injectable()
export class CurrencyService {
    constructor(
        @InjectModel('currency') private currencyModel: Model<Currency>,
    ){}

    async getAllCurrency() {
        const currencies = await this.currencyModel.find();
        return currencies;
    }

    async createCurrency(createCurrencyDto: CreateCurrencyDto) {
        const currency = await this.currencyModel.create(createCurrencyDto)
        return currency;
    }

    // TODO: update、delete
}
