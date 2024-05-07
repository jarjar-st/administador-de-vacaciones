import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from 'src/user/dto/dto/auth.dto';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}
  @Post('register')
  async registerUser(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  @Post('login')
  async loginUser(@Body() dto: LoginUserDto) {
    return await this.authService.login(dto);
  }
}
