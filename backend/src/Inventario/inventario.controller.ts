import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards
} from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('inventario')
export class InventarioController {
  constructor(private readonly inventarioService: InventarioService) {}

  @UseGuards(JwtGuard)
  @Roles('admin', 'user', 'jefe')
  @Post()
  async create(@Body() createInventarioDto: CreateInventarioDto) {
    return this.inventarioService.create(createInventarioDto);
  }

  // @UseGuards(JwtGuard)
  // @Roles('admin', 'user')
  @Get()
  async findAll() {
    return this.inventarioService.findAll();
  }

  @UseGuards(JwtGuard)
  @Roles('admin', 'user', 'jefe')
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.inventarioService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Roles('admin')
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateInventarioDto: UpdateInventarioDto
  ) {
    return this.inventarioService.update(id, updateInventarioDto);
  }

  @UseGuards(JwtGuard)
  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.inventarioService.remove(id);
  }
}
