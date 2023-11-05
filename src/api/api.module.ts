import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { UserModule } from './user/user.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    UserModule
  ],
  controllers: [ApiController],
})
export class ApiModule { }
