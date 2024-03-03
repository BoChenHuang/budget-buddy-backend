import { Module } from '@nestjs/common';
import { FundService } from './fund.service';
import { FundController } from './fund.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FundSchema } from 'src/database/schema/fund.schema';
import { LedgerSchema } from 'src/database/schema/ledger.schema';
import { UserSchema } from 'src/database/schema/user.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {name: "fund", schema: FundSchema},
    {name: "ledger", schema: LedgerSchema},
    { name: 'user', schema: UserSchema }
  ])],
  controllers: [FundController],
  providers: [FundService]
})
export class FundModule {}
