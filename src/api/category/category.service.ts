import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateCategoryDto } from 'src/database/dto/category/create-category.dto';
import { Category } from 'src/database/schema/category.schema';
import { Setting } from 'src/database/schema/setting.schema';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel('category') private categoryModel: Model<Category>,
        @InjectModel('setting') private settingModel: Model<Setting>,
        @InjectConnection() private readonly connection: mongoose.Connection,
    ) { }

    async getCategoryById(categoryId: string) {
        const category = await this.categoryModel.findById(categoryId)
        return category;
    }

    async getCategoriesBySetting(settingId: string) {
        const setting = await this.settingModel.findById(settingId)
        const categoryIds = setting.categories;
        const categories = []
        for(const id of categoryIds) {
            const category = await this.categoryModel.findById(id)
            categories.push(category)
        }

        return categories;
    }

    async create(settingId: string, createCategoryDto: CreateCategoryDto) {
        const session = await this.connection.startSession();
        session.startTransaction();

        try {
            const setting = await this.settingModel.findById(settingId)
            if(!session) throw new NotFoundException(`Setting: ${settingId} not found`)

            const category = await this.categoryModel.create(createCategoryDto)
            setting.categories.push(category.id)
            await setting.save()
            return category;
        } catch(error) {
            await session.abortTransaction();
            return error
        } finally {
            session.endSession();
        }
    }
}
