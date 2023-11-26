import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/auth/decoratror';

@Controller('api')
export class ApiController {
    @Public()
    @Get('/test')
    getVersion() {
        return "This is message for test";
    }
}
