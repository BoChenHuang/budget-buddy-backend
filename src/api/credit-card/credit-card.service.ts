import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCreditCardDto } from 'src/database/dto/credit-card/create-credit-card.dto';
import { UpdateCreditCardDto } from 'src/database/dto/credit-card/update-credit-card.dto';
import { CreditCard } from 'src/database/schema/creditcard.schema';
import * as _ from 'lodash';

@Injectable()
export class CreditCardService {
    constructor(
        @InjectModel('creditCard') private creditCardModel: Model<CreditCard>,
    ) {}

    async getCreditCardById(creditCardId: string) {
        const creditCard = await this.creditCardModel.findById(creditCardId);
        return creditCard;
    }

    async getCreditCardsByLedgerId(ledgerId: string) {
        const creditCards = await this.creditCardModel.find({ledgerId: ledgerId});
        return creditCards;
    }

    async create(craeteCreditCardDto: CreateCreditCardDto) {
        const creaditCard = await this.creditCardModel.create(craeteCreditCardDto);
        return creaditCard;
    }

    async update(updateCreditCardDto: UpdateCreditCardDto) {
        const data = { ..._.omit(updateCreditCardDto, "creditCardId"), updateAt: Date.now()};
        const creditCard = this.creditCardModel.findByIdAndUpdate(updateCreditCardDto.creditCardId, data, {new: true});
        return creditCard;
    }
}
