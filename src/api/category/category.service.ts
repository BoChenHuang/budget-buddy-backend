import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateCategoryDto } from 'src/database/dto/category/create-category.dto';
import { UpdateCategoryDto } from 'src/database/dto/category/update-category.dto';
import { Category } from 'src/database/schema/category.schema';
import { Setting } from 'src/database/schema/setting.schema';
import * as _ from 'lodash';

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
            if(!setting) throw new NotFoundException(`Setting: ${settingId} not found`)

            const category = await this.categoryModel.create(createCategoryDto)
            setting.categories.push(category.id)
            await setting.save()
            return category;
        } catch(error) {
            await session.abortTransaction();
            return error
        } finally {
            await session.endSession();
        }
    }

    async updateCategory(updateCategoryDto: UpdateCategoryDto) {
        const data = { ..._.omit(updateCategoryDto, "categoryId"), updateAt: Date.now()}
        const category = await this.categoryModel.findByIdAndUpdate(updateCategoryDto.categoryId, data, {new: true})
        return category;
    }

    async deleteCategory(categoryId: string, settingId: string) {
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            const setting = await this.settingModel.findById(settingId)
            if(!setting) throw new NotFoundException(`Setting: ${settingId} not found`)

            const category = await this.categoryModel.findById(categoryId);
            
            // remove category in setting
            const index = setting.categories.indexOf(category.id)
            if(index > -1)
                setting.categories.splice(index, 1);

            // delete category
            await category.deleteOne();
            await setting.save()
        } catch (error) {
            await session.abortTransaction();
            return error
        } finally {
            await session.endSession()
        }
    }
}
