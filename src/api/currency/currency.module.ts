import { Module } from '@nestjs/common';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CurrencySchema } from 'src/database/schema/currency.schema';

@Module({
  imports:[MongooseModule.forFeature([{name: "currency", schema: CurrencySchema}])],
  controllers: [CurrencyController],
  providers: [CurrencyService]
})
export class CurrencyModule {}
