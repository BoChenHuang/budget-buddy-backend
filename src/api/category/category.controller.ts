import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Query, Request } from '@nestjs/common';
import { CategoryService } from './category.service';
import mongoose from 'mongoose';
import { CreateCategoryDto } from 'src/database/dto/category/create-category.dto';
import { UpdateCategoryDto } from 'src/database/dto/category/update-category.dto';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('category')
@Controller('api/category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ){}

    @ApiQuery({name: 'id', required: false, description: 'The id of category'})
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

    @Patch('/update')
    async updateCategory(@Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoryService.updateCategory(updateCategoryDto)
    }
    
    @ApiParam({name: 'id', required: true, description: 'The id of category'})
    @Delete('/delete/:id')
    async deleteCategory(@Request() req, @Param('id') id) {
        if (id) {
            if (mongoose.Types.ObjectId.isValid(id)) {
                await this.categoryService.deleteCategory(id, req.user.setting)
                return 'Sucess!'
            } else
                return new BadRequestException(`${id} is invalid.`)
        }
        return
    }
}
