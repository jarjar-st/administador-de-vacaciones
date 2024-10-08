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
import { ReservaService } from './reserva.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('reservas')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Get('/salas')
  async findAllSalas() {
    return this.reservaService.findAllSalas();
  }

  @Get('/inventario')
  async findAllInvetarios() {
    return this.reservaService.findAllInventario();
  }
  @UseGuards(JwtGuard)
  @Roles('admin', 'user', 'jefe')
  @Post()
  async create(@Body() createReservaDto: CreateReservaDto) {
    return this.reservaService.create(createReservaDto);
  }

  // @UseGuards(JwtGuard)
  // @Roles('admin', 'user')
  @Get()
  async findAll() {
    return this.reservaService.findAll();
  }

  @UseGuards(JwtGuard)
  @Roles('admin', 'user', 'jefe')
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.reservaService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Roles('admin', 'jefe')
  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() updateReservaDto: UpdateReservaDto
  ) {
    console.log('updateReservaDto', updateReservaDto);
    return this.reservaService.update(id, updateReservaDto);
  }

  @UseGuards(JwtGuard)
  @Roles('admin', 'jefe')
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.reservaService.remove(id);
  }
}
