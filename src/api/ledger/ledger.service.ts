import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateLedgerDto } from 'src/database/dto/ledger/create-ledger.dto';
import { GetLedgersOfUserDto } from 'src/database/dto/ledger/get-ledgers-of-user.dto';
import { UpdateLedgerDto } from 'src/database/dto/ledger/update-ledger.dto';
import { Ledger } from 'src/database/schema/ledger.schema';
import * as _ from 'lodash';
import { Fund } from 'src/database/schema/fund.schema';
import { CreditCard } from 'src/database/schema/creditcard.schema';
import { Record } from 'src/database/schema/record.schema';

@Injectable()
export class LedgerService {
  constructor(
    @InjectModel('ledger') private ledgerModel: Model<Ledger>,
    @InjectModel('fund') private fundModel: Model<Fund>,
    @InjectModel('record') private recordModel: Model<Record>,
    @InjectModel('creditCard') private creditCardModel: Model<CreditCard>,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async getLedgerById(id: string) {
    return await this.ledgerModel.findById(id);
  }

  async getLedger(getLedgerDto: GetLedgersOfUserDto) {
    const ledgers = await this.ledgerModel.find({ owner: getLedgerDto.userId });
    return ledgers;
  }

  async create(createLedgerDto: CreateLedgerDto & { userId: string }) {
    const ledger = new this.ledgerModel({
      name: createLedgerDto.name,
      image: createLedgerDto.image,
      description: createLedgerDto.description,
      owner: createLedgerDto.userId,
    });

    return await ledger.save();
  }

  async delete(ledgerId: string, userId: string) {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      // delete the records、found and credit card of ledgers
      await this.recordModel.deleteMany(
        { ledgerId: ledgerId },
        { session: session },
      );
      await this.fundModel.deleteMany(
        { ledgerId: ledgerId },
        { session: session },
      );
      await this.creditCardModel.deleteMany(
        { ledgerId: ledgerId },
        { session: session },
      );
      await this.ledgerModel.findOneAndDelete(
        { _id: ledgerId, owner: userId },
        { session: session },
      );

      session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      return error;
    } finally {
      await session.endSession();
    }
  }

  async update(updateLedgerDto: UpdateLedgerDto & { userId: string }) {
    const data = {
      ..._.omit(updateLedgerDto, ['ledgerId', 'userId']),
      updateAt: Date.now(),
    };
    const ledger = await this.ledgerModel.findOneAndUpdate(
      { _id: updateLedgerDto.ledgerId, owner: updateLedgerDto.userId },
      data,
      { new: true },
    );
    return ledger;
  }
}
