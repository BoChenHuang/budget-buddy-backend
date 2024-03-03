import { Module } from '@nestjs/common';
import { CreditCardController } from './credit-card.controller';
import { CreditCardService } from './credit-card.service';
import { CreditCardSchema } from 'src/database/schema/creditcard.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { LedgerSchema } from 'src/database/schema/ledger.schema';
import { UserSchema } from 'src/database/schema/user.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {name: "creditCard", schema: CreditCardSchema},
    {name: "ledger", schema: LedgerSchema},
    { name: 'user', schema: UserSchema }
  ])],
  controllers: [CreditCardController],
  providers: [CreditCardService]
})
export class CreditCardModule {}
