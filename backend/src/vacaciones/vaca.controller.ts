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
import { VacaService } from './vaca.service';
import { CreateVacaDto } from './dto/create-vaca.dto';
import { UpdateVacaDto } from './dto/update-vaca.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('vacaciones')
export class VacaController {
  constructor(private readonly vacaService: VacaService) {}

  @UseGuards(JwtGuard)
  @Roles('admin', 'user')
  @Post()
  async create(@Body() createVacaDto: CreateVacaDto) {
    return this.vacaService.create(createVacaDto);
  }

  // @UseGuards(JwtGuard)
  // @Roles('admin', 'user')
  @Get()
  async findAll() {
    return this.vacaService.findAll();
  }

  @UseGuards(JwtGuard)
  @Roles('admin', 'user')
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.vacaService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Roles('admin')
  @Put('/:id')
  async update(@Param('id') id: number, @Body() updateVacaDto: UpdateVacaDto) {
    return this.vacaService.update(id, updateVacaDto);
  }

  @UseGuards(JwtGuard)
  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.vacaService.remove(id);
  }
}
