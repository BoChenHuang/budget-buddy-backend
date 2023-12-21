import { Module } from '@nestjs/common';
import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';
import { SettingSchema } from 'src/database/schema/setting.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{name: "setting", schema: SettingSchema}])],
    controllers: [SettingController],
    providers: [SettingService]
})
export class SettingModule {}
