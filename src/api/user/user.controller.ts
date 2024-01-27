import { BadRequestException, Body, Controller, Get, Post, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/database/dto/user/create-user.dto';
import { Public } from 'src/auth/decoratror';
import { UpdateUserDto } from 'src/database/dto/user/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import * as _ from 'lodash'

@ApiBearerAuth()
@ApiTags('user')
@Controller('api/user')
export class UserController {
    constructor(private readonly userService: UserService, private configService: ConfigService) { }

    @Public()
    @Post('/create')
    create(@Body() createUserDto: CreateUserDto) {
        const verification = this.configService.get<string>('app.verification');

        if(_.isEqual(createUserDto.verification, verification)) {
            return this.userService.create(createUserDto);
        } else {
            throw new BadRequestException('Verification error')
        }
    }

    @Get()
    getById(@Request() req) {
        const userId = req.user.id
        return this.userService.getById(userId);
    }

    @Post('/update')
    update(@Request() req, @Body() body: UpdateUserDto) {
        const dto = {userId: req.user.id, ...body }
        return this.userService.update(dto);
    }
}
