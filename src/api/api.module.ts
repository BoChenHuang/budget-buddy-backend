import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LedgerModule } from './ledger/ledger.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    LedgerModule
  ],
  controllers: [ApiController],
  providers: [],
})
export class ApiModule { }
