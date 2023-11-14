import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import config from './config/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config], isGlobal: true }),
    ApiModule,
    MongooseModule.forRootAsync(
      {
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          uri: configService.get<string>('database.url'),
          dbName: configService.get<string>('database.dbname')
        }),
        inject: [ConfigService],
      }
    )
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
