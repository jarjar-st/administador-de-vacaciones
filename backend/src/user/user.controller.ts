import {
  Controller,
  Get,
  Param,
  UseGuards,
  Post,
  Body,
  BadRequestException,
  Query,
  Put
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CreateUsuarioDto } from './dto/user.dto';
import { Roles } from 'src/auth/roles.decorator';
import { UpdateUsuarioDto } from './dto/update-user.dto';

@Controller('usuarios')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('roles')
  // @Roles('admin')
  async allRoles() {
    return this.userService.allRoles();
  }

  @Get('departamentos')
  // @Roles('admin')
  async allDepartamentos() {
    return this.userService.allDepartamentos();
  }

  @Get('cargos')
  // @Roles('admin')
  async allCargos() {
    return this.userService.allCargos();
  }
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
  async findAll() {
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

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() createUsuarioDto: CreateUsuarioDto
  ) {
    return await this.userService.update(id, createUsuarioDto);
  }
}
