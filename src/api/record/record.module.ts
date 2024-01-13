import { Module } from '@nestjs/common';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';
import { RecordSchema } from 'src/database/schema/record.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { LedgerSchema } from 'src/database/schema/ledger.schema';
import { FundSchema } from 'src/database/schema/fund.schema';
import { CreditCardSchema } from 'src/database/schema/creditcard.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {name: "record", schema: RecordSchema}, 
    {name: "ledger", schema: LedgerSchema},
    {name: "fund", schema: FundSchema},
    {name: "creditCard", schema: CreditCardSchema}
  ])],
  controllers: [RecordController],
  providers: [RecordService]
})
export class RecordModule {}
