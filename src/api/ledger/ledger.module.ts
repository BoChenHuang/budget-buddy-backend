import { Module } from '@nestjs/common';
import { LedgerController } from './ledger.controller';
import { LedgerService } from './ledger.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LedgerSchema } from 'src/database/schema/ledger.schema';
import { RecordSchema } from 'src/database/schema/record.schema';
import { FundSchema } from 'src/database/schema/fund.schema';
import { CreditCardSchema } from 'src/database/schema/creditcard.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {name: "ledger", schema: LedgerSchema},
    {name: "record", schema: RecordSchema}, 
    {name: "fund", schema: FundSchema},
    {name: "creditCard", schema: CreditCardSchema}
  ])],
  controllers: [LedgerController],
  providers: [LedgerService]
})
export class LedgerModule {}
