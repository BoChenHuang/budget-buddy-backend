import { Controller, Get, Request } from '@nestjs/common';
import { SettingService } from './setting.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('setting')
@Controller('api/setting')
export class SettingController {
    constructor(private readonly settingService: SettingService) { }

    @Get()
    getSetting(@Request() req) {
        const settingId = req.user.setting
        return this.settingService.getById(settingId)
    }

}
