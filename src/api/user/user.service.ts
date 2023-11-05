import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/database/schema/user.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('user') private userModel: Model<User>
    ){}

    async getAll() {
        const users = await this.userModel.find();
        return users;
    }
}
