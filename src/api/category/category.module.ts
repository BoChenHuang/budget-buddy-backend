import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategorySchema } from 'src/database/schema/category.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SettingSchema } from 'src/database/schema/setting.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: "category", schema: CategorySchema}, {name: "setting", schema: SettingSchema}])],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
