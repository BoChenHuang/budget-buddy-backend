import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LedgerModule } from './ledger/ledger.module';
import { SettingModule } from './setting/setting.module';
import { CategoryModule } from './category/category.module';
import { FundModule } from './fund/fund.module';
import { CreditCardModule } from './credit-card/credit-card.module';
import { RecordModule } from './record/record.module';
import { CurrencyModule } from './currency/currency.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    LedgerModule,
    SettingModule,
    CategoryModule,
    FundModule,
    CreditCardModule,
    RecordModule,
    CurrencyModule
  ],
  controllers: [ApiController],
  providers: [],
})
export class ApiModule { }
