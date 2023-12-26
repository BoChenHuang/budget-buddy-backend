import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLedgerDto } from 'src/database/dto/ledger/create-ledger.dto';
import { GetLedgersOfUserDto } from 'src/database/dto/ledger/get-ledgers-of-user.dto';
import { UpdateLedgerDto } from 'src/database/dto/ledger/update-ledger.dto';
import { Ledger } from 'src/database/schema/ledger.schema';
import * as _ from 'lodash';
@Injectable()
export class LedgerService {
    constructor(
        @InjectModel('ledger') private ledgerModel: Model<Ledger>,
    ) { }

    async getLedgerById(id: string) {
        return await this.ledgerModel.findById(id)
    }

    async getLedger(getLedgerDto: GetLedgersOfUserDto) {
        const ledgers = await this.ledgerModel.find({ owner: getLedgerDto.userId })
        return ledgers
    }

    async create(createLedgerDto: CreateLedgerDto & { userId: string }) {
        const ledger = new this.ledgerModel({
            name: createLedgerDto.name,
            image: createLedgerDto.image,
            description: createLedgerDto.description,
            owner: createLedgerDto.userId
        })

        return await ledger.save()
    }

    async delete(ledgerId: string, userId: string) {
        await this.ledgerModel.findOneAndDelete({_id: ledgerId, owner: userId});
        // TODO: delete the records、found and credit card of ledgers
    }

    async update(updateLedgerDto: UpdateLedgerDto & {userId: string}) {
        const data ={..._.omit(updateLedgerDto, [ 'ledgerId', 'userId' ]), updateAt: Date.now()}
        const ledger = await this.ledgerModel.findOneAndUpdate({ _id: updateLedgerDto.ledgerId, owner: updateLedgerDto.userId }, data, {new: true})
        return ledger
    }
}
