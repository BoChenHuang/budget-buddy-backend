import { ForbiddenException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCreditCardDto } from 'src/database/dto/credit-card/create-credit-card.dto';
import { UpdateCreditCardDto } from 'src/database/dto/credit-card/update-credit-card.dto';
import { CreditCard } from 'src/database/schema/creditcard.schema';
import * as _ from 'lodash';
import { SetCreditCardLockDto } from 'src/database/dto/credit-card/set-credit-card-lock.dto';
import { Ledger } from 'src/database/schema/ledger.schema';
import { User } from 'src/database/schema/user.schema';

@Injectable()
export class CreditCardService {
    constructor(
        @InjectModel('creditCard') private creditCardModel: Model<CreditCard>,
        @InjectModel('ledger') private ledgerModel: Model<Ledger>,
        @InjectModel('user') private userModel: Model<User>,
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
        const ledger = await this.ledgerModel.findById(craeteCreditCardDto.ledgerId)
        if(!ledger)
            throw new NotFoundException(`Leger: ${craeteCreditCardDto.ledgerId} not found.`);
        else {
            const user = await this.userModel.findById(ledger.owner);
            if(user.name == "test") {
                const creditCards = await this.getCreditCardsByLedgerId(ledger._id.toString());
                if(creditCards.length >= 1)
                    throw new ForbiddenException('Test accounts are only allowed to have one credit card.');
            }

            const creaditCard = await this.creditCardModel.create(craeteCreditCardDto);
            return creaditCard;
        }
    }

    async update(updateCreditCardDto: UpdateCreditCardDto) {
        const data = { ..._.omit(updateCreditCardDto, ["creditCardId","lock"]), updateAt: Date.now()};

        const creditCard = await this.creditCardModel.findById(updateCreditCardDto.creditCardId);
        if (creditCard.lock == true) {
            throw new HttpException("CreditCard is locked", 403)
        } else {
            const newCreditCard = await this.creditCardModel.findByIdAndUpdate(updateCreditCardDto.creditCardId, 
                                                                                data,
                                                                                {new: true});
            return newCreditCard;
        }
    }

    async setLock(setCreditCardLockDto: SetCreditCardLockDto) {
        const creaditCard = await this.creditCardModel.findByIdAndUpdate(setCreditCardLockDto.creditCardId, 
                                                                        {lock: setCreditCardLockDto.lock},
                                                                        {new: true});
        return creaditCard;                                                                
    }
}
