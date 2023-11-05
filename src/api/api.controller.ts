import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class ApiController {
    @Get('/test')
    getVersion() {
        return "This is message for test";
    }
}
