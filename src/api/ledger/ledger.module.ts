import { Module } from '@nestjs/common';
import { LedgerController } from './ledger.controller';
import { LedgerService } from './ledger.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LedgerSchema } from 'src/database/schema/ledger.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: "ledger", schema: LedgerSchema}])],
  controllers: [LedgerController],
  providers: [LedgerService]
})
export class LedgerModule {}
