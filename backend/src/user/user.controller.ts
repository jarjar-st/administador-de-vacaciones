import {
  Controller,
  Get,
  Param,
  UseGuards,
  Post,
  Body,
  BadRequestException,
  Query
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CreateUsuarioDto } from './dto/user.dto';
import { Roles } from 'src/auth/roles.decorator';

@Controller('usuarios')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(JwtGuard)
  @Roles('admin')
  @Get(':id')
  async getUserId(@Param('id') id: number) {
    return await this.userService.findById(id);
  }
  @UseGuards(JwtGuard)
  @Roles('admin')
  @Post('registrar-usuario')
  async crearUsuario(@Body() createUsuarioDto: CreateUsuarioDto) {
    return await this.userService.create(createUsuarioDto);
  }
  @Get()
  @Roles('admin')
  findAll() {
    return this.userService.findAll();
  }
  @Roles('admin', 'user')
  @Post('find-by-email')
  async findByEmail(@Body('email') email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    return this.userService.findByEmail(email);
  }
}
