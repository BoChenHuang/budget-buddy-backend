import { Module } from '@nestjs/common';
import { FundService } from './fund.service';
import { FundController } from './fund.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FundSchema } from 'src/database/schema/fund.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: "fund", schema: FundSchema}])],
  controllers: [FundController],
  providers: [FundService]
})
export class FundModule {}
