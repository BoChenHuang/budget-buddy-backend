import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';

@Controller('api/user')
export class UserController {
    constructor(private readonly userService: UserService, private configService: ConfigService) { }

    @Get()
    getAll() {
        return this.userService.getAll();
    }
}
