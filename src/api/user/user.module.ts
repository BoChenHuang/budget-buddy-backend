import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/database/schema/user.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MongooseModule.forFeature([{name: 'user', schema:UserSchema}]), ConfigModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
