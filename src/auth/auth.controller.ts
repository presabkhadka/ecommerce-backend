import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'src/common/pipes/zod.pipe';
import { signupSchema } from './dto/signup-auth.dto';
import type { signupDto } from './dto/signup-auth.dto';
import { loginSchema } from './dto/login-auth.dto';
import type { loginDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  @UsePipes(new ZodValidationPipe(signupSchema))
  async signup(
    @Body() dto: signupDto
  ) {
    return this.authService.signup(dto)
  }

  @Post('login')
  @UsePipes(new ZodValidationPipe(loginSchema))
  async login(
    @Body() dto: loginDto
  ) {
    return this.authService.login(dto)
  }

}
