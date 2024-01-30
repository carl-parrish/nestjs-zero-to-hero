import { Body, Controller, Post } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signUp(
    @Body()
    authCredentials: Prisma.UserCreateInput,
  ): Promise<User> {
    return this.authService.signUp(authCredentials);
  }
}
