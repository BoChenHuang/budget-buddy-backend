import { ForbiddenException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateFundDto } from 'src/database/dto/fund/create-fund.dto';
import { UpdateFundDto } from 'src/database/dto/fund/update-fund.dto';
import { Fund } from 'src/database/schema/fund.schema';
import * as _ from "lodash";
import { SetFundLockDto } from 'src/database/dto/fund/set-fund-lock.dto';
import { Ledger } from 'src/database/schema/ledger.schema';
import { User } from 'src/database/schema/user.schema';

@Injectable()
export class FundService {
    constructor(
        @InjectModel('fund') private fundModel: Model<Fund>,
        @InjectModel('ledger') private ledgerModel: Model<Ledger>,
        @InjectModel('user') private userModel: Model<User>,
    ){}

    async getFundById(id: string) {
        const fund = await this.fundModel.findById(id);
        return fund;
    }

    async getFundsByLedgerId(ledgerId: string) {
        const funds = await this.fundModel.find({ledgerId: ledgerId});
        return funds;
    }

    async create(createFundDto: CreateFundDto) {
        const leger = await this. ledgerModel.findById(createFundDto.ledgerId);
        if(!leger) {
            throw new NotFoundException(`Leger: ${createFundDto.ledgerId} not found.`);
        } else {
            const user = await this.userModel.findById(leger.owner);
            if(user.name == "test") {
                const founds = await this.getFundsByLedgerId(leger._id.toString());
                if(founds.length >= 1)
                    throw new ForbiddenException('Test accounts are only allowed to have one found.');
            }
            const fund = await this.fundModel.create(createFundDto);
            return fund;
        }
    }

    async update(updateFundDto: UpdateFundDto) {
        const data = { ..._.omit(updateFundDto, ["fundId", "lock"]), updateAt: Date.now()}
        const fund = await this.fundModel.findById(updateFundDto.fundId)

        if(fund.lock == true) {
            throw new HttpException("Fund is locked", 403)
        } else {
            const newfund = await this.fundModel.findByIdAndUpdate(updateFundDto.fundId, data, {new: true});
            return newfund;
        }
    }

    async setLock(setFundLockDto: SetFundLockDto) {
        const fund = await this.fundModel.findByIdAndUpdate(setFundLockDto.fundId, {lock: setFundLockDto.lock}, {new: true})
        return fund
    }
}
