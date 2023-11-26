import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/database/dto/create-user.dto';
import { User } from 'src/database/schema/user.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('user') private userModel: Model<User>
    ) { }

    async getAll() {
        const users = await this.userModel.find();
        return users;
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        // create a setting for new user
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }
}
