import { BadRequestException, Body, Controller, Get, Post, Query, Request } from '@nestjs/common';
import { CategoryService } from './category.service';
import mongoose from 'mongoose';
import { CreateCategoryDto } from 'src/database/dto/category/create-category.dto';

@Controller('api/category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ){}

    @Get()
    async getCategory(@Request() req, @Query('id') id?: string) {
        if(id) {
            if (mongoose.Types.ObjectId.isValid(id)) {
                if (id)
                    return this.categoryService.getCategoryById(id)
                else
                    return null
            } else
                return new BadRequestException(`${id} is invalid.`)
        } else {
            const settingId = req.user.setting
            return this.categoryService.getCategoriesBySetting(settingId)
        }
    }

    @Post('/create')
    async createCategory(@Request() req, @Body() createCategoryDto: CreateCategoryDto) {
        const settingId = req.user.setting;
        return this.categoryService.create(settingId, createCategoryDto);
    }

    // TODO: update
    // TODO: delete
}
