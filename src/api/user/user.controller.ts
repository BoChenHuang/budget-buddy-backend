import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/database/dto/create-user.dto';
import { Public } from 'src/auth/decoratror';

@Controller('api/user')
export class UserController {
    constructor(private readonly userService: UserService, private configService: ConfigService) { }

    @Get()
    getAll() {
        return this.userService.getCountOfUsers();
    }

    @Public()
    @Post('/create')
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }
}
