import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateRecordDto } from 'src/database/dto/record/create-record.dto';
import { CreditCard } from 'src/database/schema/creditcard.schema';
import { Fund } from 'src/database/schema/fund.schema';
import { Ledger } from 'src/database/schema/ledger.schema';
import { Record } from 'src/database/schema/record.schema';

@Injectable()
export class RecordService {
    constructor(
        @InjectModel('record') private recordModel: Model<Record>,
        @InjectModel('ledger') private ledgerModel: Model<Ledger>,
        @InjectModel('fund') private fundModel: Model<Fund>,
        @InjectModel('creditCard') private creditCardModel: Model<CreditCard>,
        @InjectConnection() private readonly connection: mongoose.Connection,
    ) { }

    async getRecordById(recordId: string) {
        const record = await this.recordModel.findById(recordId)
        return record
    }

    async getRecordsOfLedger(ledgerId) {
        const records = await this.recordModel.find({ledgerId: ledgerId})
        return records
    }

    async createRecord(createRecordDto: CreateRecordDto) {
        const ledger = await this.ledgerModel.findById(createRecordDto.ledgerId)
        if (!ledger)
        throw new NotFoundException(`Ledger: ${createRecordDto.ledgerId} not found`)
        else {
            const session = await this.connection.startSession();
            session.startTransaction();

            try {
                
                if(createRecordDto.type) {
                    if(createRecordDto.type == "income") { // 收入
                        const fund = await this.fundModel.findById(createRecordDto.destination)
                        if(!fund)
                            throw new NotFoundException(`Fund: ${createRecordDto.destination} not found`);
                        else if(fund.lock)
                            throw new HttpException(`Fund: ${createRecordDto.destination} is locked`, 403);
                        else {
                            fund.deposit += createRecordDto.amount;
                            await fund.save();
                        }
                    } else if (createRecordDto.type == "expenditure" ){ //支出
                        if(createRecordDto.sourceType) {
                            if(createRecordDto.sourceType == "Fund") {
                                const fund = await this.fundModel.findById(createRecordDto.source);
                                if(!fund)
                                    throw new NotFoundException(`Fund: ${createRecordDto.source} not found`);
                                else if(fund.lock)
                                    throw new HttpException(`Fund: ${createRecordDto.source} is locked`, 403);
                                else {
                                    fund.deposit -= createRecordDto.amount;
                                    await fund.save();
                                }
                            } else if(createRecordDto.sourceType == "CreditCard") {
                                const creaditCard = await this.creditCardModel.findById(createRecordDto.source);
                                if(!creaditCard)
                                    throw new NotFoundException(`CreaditCard: ${createRecordDto.source} not found`);
                                else if(creaditCard.lock)
                                    throw new HttpException(`CreditCard: ${createRecordDto.source} is locked`, 403);
                                else {
                                    creaditCard.limit -= createRecordDto.amount;
                                    await creaditCard.save();
                                }
                            }
                        }
                    } else if (createRecordDto.type == "transfer"){ // 轉帳
                        if(createRecordDto.source && createRecordDto.destination) {
                            const source = await this.fundModel.findById(createRecordDto.source);
                            const destination = await this.fundModel.findById(createRecordDto.destination);

                            if(!source)
                                throw new NotFoundException(`Fund: ${createRecordDto.source} not found`);
                            else if(source.lock)
                                throw new HttpException(`Fund: ${createRecordDto.source} is locked`, 403);

                            if(!destination)
                                throw new NotFoundException(`Fund: ${createRecordDto.destination} not found`);
                            else if(destination.lock)
                                throw new HttpException(`Fund: ${createRecordDto.destination} is locked`, 403);

                            source.deposit -= createRecordDto.amount;
                            destination.deposit += createRecordDto.amount;

                            await source.save();
                            await destination.save();
                        }
                    }
                }

                const record = await this.recordModel.create(createRecordDto)
                return record;
            } catch (error) {
                await session.abortTransaction();
                return error
            } finally {
                await session.endSession();
            }
        }
    }
    // TODO: createa record
    // TODO: update record
    // TODO: delete record
}
