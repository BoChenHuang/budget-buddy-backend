import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Record } from 'src/database/schema/record.schema';

@Injectable()
export class RecordService {
    constructor(
        @InjectModel('record') private recordModel: Model<Record>,
    ) { }

    async getRecordById(recordId: string) {
        const record = await this.recordModel.findById(recordId)
        return record
    }

    async getRecordsOfLedger(ledgerId) {
        const records = await this.recordModel.find({ledgerId: ledgerId})
        return records
    }

    // TODO: createa record
    // TODO: update record
    // TODO: delete record
}
