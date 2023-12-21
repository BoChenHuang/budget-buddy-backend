import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LedgerModule } from './ledger/ledger.module';
import { SettingModule } from './setting/setting.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    LedgerModule,
    SettingModule,
    CategoryModule
  ],
  controllers: [ApiController],
  providers: [],
})
export class ApiModule { }
