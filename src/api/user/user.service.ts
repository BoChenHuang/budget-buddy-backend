import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/database/dto/user/create-user.dto';
import { Setting } from 'src/database/schema/setting.schema';
import { User } from 'src/database/schema/user.schema';
import * as _ from 'lodash'
import { UpdateUserDto } from 'src/database/dto/user/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('user') private userModel: Model<User>,
        @InjectModel('setting') private settingModel: Model<Setting>
    ) { }

    async getCountOfUsers() {
        const count = await this.userModel.find().count();
        return count;
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            const user = await this.userModel.find({email: createUserDto.email})
            console.log(user)
            if(_.size(user))
                throw new ConflictException('Email is aready exists')

            const setting = new this.settingModel({})
            await setting.save()
            if (setting._id) {
                const userDto = {...createUserDto, setting: setting._id}
                const createdUser = new this.userModel(userDto);
                return createdUser.save();
            }
            return null
        } catch (error) {
            return error
        }
    }

    async getById(id: string) {
        const user = await this.userModel.findById(id)
        return user
    }

    async update(updateUserDto: UpdateUserDto & {userId: string}) {
        const data = _.omit(updateUserDto, 'userId')
        //TODO: update the updateAt property
        const user = await this.userModel.findByIdAndUpdate(updateUserDto.userId, data, { new: true })
        return user
    }
}
