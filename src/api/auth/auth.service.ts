import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/database/schema/user.schema';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('user') private userModel: Model<User>,
        private jwtService: JwtService
      ) {}
    
      async signIn(username: string, pass: string) {
        const user = await this.userModel.findOne({name: username});
        if (user?.password !== pass) {
          throw new UnauthorizedException();
        }
        const payload = { id: user._id, username: user.name , email: user.email };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
}
