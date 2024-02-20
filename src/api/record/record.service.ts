import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateRecordDto } from 'src/database/dto/record/create-record.dto';
import { UpdateRecordDto } from 'src/database/dto/record/update-record.dto';
import { CreditCard } from 'src/database/schema/creditcard.schema';
import { Fund } from 'src/database/schema/fund.schema';
import { Ledger } from 'src/database/schema/ledger.schema';
import { Record } from 'src/database/schema/record.schema';
import * as _ from "lodash";
import { endOfDay, startOfDay } from 'date-fns';

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
        const record = await this.recordModel.findById(recordId);
        return record;
    }

    async getRecordsOfLedger(ledgerId: string, dateFilter?: {start: string, end: string}) {
        const records = dateFilter ? await this.recordModel.find({date: {
            $gte: startOfDay(new Date(dateFilter.start)), 
            $lte: endOfDay(new Date(dateFilter.end))
        }}) : await this.recordModel.find({ledgerId: ledgerId});

        return records;
    }

    async createRecord(createRecordDto: CreateRecordDto) {
        // 確認 record 所屬的 ledger 存在
        const ledger = await this.ledgerModel.findById(createRecordDto.ledgerId)
        if (!ledger)
            throw new NotFoundException(`Ledger: ${createRecordDto.ledgerId} not found`)
        else {
            const session = await this.connection.startSession();
            session.startTransaction();

            try {
                
                if(createRecordDto.type) {
                    if(createRecordDto.type == "income") { // 收入
                        const fund = await this.fundModel.findById(createRecordDto.destination).session(session).exec();
                        // 若存款帳戶不存在或為鎖住狀態不執行
                        if(!fund)
                            throw new NotFoundException(`Fund: ${createRecordDto.destination} not found`);
                        else if(fund.lock)
                            throw new HttpException(`Fund: ${createRecordDto.destination} is locked`, 403);
                        else {
                            fund.deposit += createRecordDto.amount;
                            await fund.save({session: session});
                        }
                    } else if (createRecordDto.type == "expenditure" ){ //支出
                        if(createRecordDto.sourceType) {
                            // 支出可能來自帳戶或信用卡
                            if(createRecordDto.sourceType == "Fund") {
                                const fund = await this.fundModel.findById(createRecordDto.source).session(session).exec()
                                if(!fund)
                                    throw new NotFoundException(`Fund: ${createRecordDto.source} not found`);
                                else if(fund.lock)
                                    throw new HttpException(`Fund: ${createRecordDto.source} is locked`, 403);
                                else {
                                    fund.deposit -= createRecordDto.amount;
                                    await fund.save({session: session});
                                }
                            } else if(createRecordDto.sourceType == "CreditCard") {
                                const creditCard = await this.creditCardModel.findById(createRecordDto.source).session(session).exec();
                                if(!creditCard)
                                    throw new NotFoundException(`CreaditCard: ${createRecordDto.source} not found`);
                                else if(creditCard.lock)
                                    throw new HttpException(`CreditCard: ${createRecordDto.source} is locked`, 403);
                                else {
                                    creditCard.limit -= createRecordDto.amount;
                                    await creditCard.save({session: session});
                                }
                            } else {
                                throw new BadRequestException("sourceType is null")
                            }
                        }
                    } else if (createRecordDto.type == "transfer") { // 轉帳
                        if(createRecordDto.source && createRecordDto.destination) {
                            // 轉帳為帳戶間互轉
                            const source = await this.fundModel.findById(createRecordDto.source).session(session).exec();
                            const destination = await this.fundModel.findById(createRecordDto.destination).session(session).exec();

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

                            await source.save({session: session});
                            await destination.save({session: session});
                        }
                    }
                }

                const record = await this.recordModel.create(createRecordDto)
                await session.commitTransaction();
                return record;
            } catch (error) {
                await session.abortTransaction();
                return error
            } finally {
                await session.endSession();
            }
        }
    }

    // update record
    async updateRecord(updateRecordDto: UpdateRecordDto) {
        const data = _.omit(updateRecordDto, ["recordId"]);
        const record = await this.recordModel.findById(updateRecordDto.recordId);
        if(!record)
            throw new  NotFoundException(`Record: ${updateRecordDto.recordId} not found`);

        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            // 若有更新金額，須先還原原先的操作
            if(updateRecordDto.amount != undefined) {
                if (record.type == "income") {
                    const fund = await this.fundModel.findById(record.destination).session(session).exec();
                    if(fund) {
                        fund.deposit -= record.amount; //還原收入操作，將增加的金額扣除
                        fund.deposit += updateRecordDto.amount // 增加本次的收入金額
                        await fund.save({session: session});
                    } else
                    if(!fund)
                        throw new NotFoundException(`Undo error: income destination: ${record.destination} not exist`);
                } else if (record.type == "expenditure") {
                    if(record.sourceType) {
                        if(record.sourceType == "Fund") {
                            const fund = await this.fundModel.findById(record.source).session(session).exec();
                            if(!fund)
                                throw new NotFoundException(`Undo error: expenditure source ${record.source} not exist`);
                            else {
                                fund.deposit += record.amount; // 還原支出操作，將支出加回來
                                fund.deposit -= updateRecordDto.amount; // 扣除本次的支出金額
                                await fund.save({session: session});
                            }
                        } else if(record.sourceType == "CreditCard") {
                            const creditCard = await this.creditCardModel.findById(record.source).session(session).exec();
                            if(!creditCard)
                                throw new NotFoundException(`Undo error: expenditure source ${record.source} not exist`);
                            else {
                                creditCard.limit += record.amount; // 還原支出操作，將支出加回來
                                creditCard.limit -= updateRecordDto.amount // 扣除本次的支出金額
                                await creditCard.save({session: session});
                            }
                        }
                    }
                } else if (record.type == "transfer") { // 還原轉帳操作
                    const source = await this.fundModel.findById(record.source).session(session).exec();
                    const destination = await this.fundModel.findById(record.destination).session(session).exec();

                    if(!source)
                        throw new NotFoundException(`Undo error: transfer source ${record.source} not exist`);

                    if(!destination)
                        throw new NotFoundException(`Undo error: transfer destination ${record.destination} not exist`);
                    

                    // 還原轉帳金額
                    source.deposit += record.amount;
                    destination.deposit -= record.amount;

                    // 執行本次轉帳
                    source.deposit -= updateRecordDto.amount;
                    destination.deposit += updateRecordDto.amount;

                    await source.save({session: session});
                    await destination.save({session: session});
                }
            }
            const newRecord = await this.recordModel.findByIdAndUpdate(updateRecordDto.recordId, data, {new: true}).session(session).exec()
            await session.commitTransaction();
            return newRecord;
        }  catch (error) {
            await session.abortTransaction();
            return error
        } finally {
            await session.endSession();
        }
    }

    async deleteRecord(recordId: string) {
        const record = await this.recordModel.findById(recordId)
        if (!record)
            throw new NotFoundException(`Record: ${recordId} not found`)

        const session = await this.connection.startSession();
        session.startTransaction();
        try {
        // 還原原先的操作
            if (record.type == "income") { //還原收入操作
                const fund = await this.fundModel.findById(record.destination).session(session).exec();
                if(fund) {
                    fund.deposit -= record.amount; // 將增加的金額扣除
                    await fund.save({session: session});
                } else
                if(!fund)
                    throw new NotFoundException(`Undo error: income destination: ${record.destination} not exist`);
            } else if (record.type == "expenditure") { // 還原支出操作
                if(record.sourceType) {
                    if(record.sourceType == "Fund") {
                        const fund = await this.fundModel.findById(record.source).session(session).exec();
                        if(!fund)
                            throw new NotFoundException(`Undo error: expenditure source ${record.source} not exist`);
                        else {
                            fund.deposit += record.amount; // 將支出加回來
                            await fund.save({session: session});
                        }
                    } else if(record.sourceType == "CreditCard") {
                        const creditCard = await this.creditCardModel.findById(record.source).session(session).exec();
                        if(!creditCard)
                            throw new NotFoundException(`Undo error: expenditure source ${record.source} not exist`);
                        else {
                            creditCard.limit += record.amount; // 將支出加回來
                            await creditCard.save({session: session});
                        }
                    }
                }
            } else if (record.type == "transfer") { // 還原轉帳操作
                const source = await this.fundModel.findById(record.source).session(session).exec();
                const destination = await this.fundModel.findById(record.destination).session(session).exec();

                if(!source)
                    throw new NotFoundException(`Undo error: transfer source ${record.source} not exist`);

                if(!destination)
                    throw new NotFoundException(`Undo error: transfer destination ${record.destination} not exist`);
                

                // 還原轉帳金額
                source.deposit += record.amount;
                destination.deposit -= record.amount;

                await source.save({session: session});
                await destination.save({session: session});
            }

            await record.deleteOne({session: session});
            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            return error
        } finally {
            await session.endSession();
        }
    }
}
