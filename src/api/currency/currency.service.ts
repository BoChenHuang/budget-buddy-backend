import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

    // TODO: create、update、delete
}
