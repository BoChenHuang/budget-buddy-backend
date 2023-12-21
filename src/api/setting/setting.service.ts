import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Setting } from 'src/database/schema/setting.schema';

@Injectable()
export class SettingService {
    constructor(
        @InjectModel('setting') private settingModel: Model<Setting>,
    ) { }

    async getById(id: string) {
        const setting = await this.settingModel.findById(id)
        return setting;
    }
}
