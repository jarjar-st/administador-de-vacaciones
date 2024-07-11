import { Controller, Get, Param, UseGuards, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CreateUsuarioDto } from './dto/user.dto';

@Controller('usuarios')
export class UserController {
  constructor(private userService: UserService) {}
  // @UseGuards(JwtGuard)
  @Get(':id')
  async getUserId(@Param('id') id: number) {
    return await this.userService.findById(id);
  }
  @Post('registrar-usuario')
  async crearUsuario(@Body() createUsuarioDto: CreateUsuarioDto) {
    return await this.userService.create(createUsuarioDto);
  }
  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
