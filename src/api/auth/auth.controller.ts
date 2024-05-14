import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/auth/decoratror';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/signin.dto';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('verifyToken')
  verify(@Body() verifyDto: { token: string }) {
    return this.authService.verify(verifyDto.token);
  }
}
