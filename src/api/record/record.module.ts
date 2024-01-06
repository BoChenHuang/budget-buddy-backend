import { Module } from '@nestjs/common';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';
import { RecordSchema } from 'src/database/schema/record.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{name: "record", schema: RecordSchema}])],
  controllers: [RecordController],
  providers: [RecordService]
})
export class RecordModule {}
