import { Module } from '@nestjs/common';
import { CreditCardController } from './credit-card.controller';
import { CreditCardService } from './credit-card.service';
import { CreditCardSchema } from 'src/database/schema/creditcard.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name: "creditCard", schema: CreditCardSchema}])],
  controllers: [CreditCardController],
  providers: [CreditCardService]
})
export class CreditCardModule {}
