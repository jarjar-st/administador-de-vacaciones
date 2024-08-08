import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';

@Injectable()
export class InventarioService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateInventarioDto) {
    return this.prisma.inventario.create({
      data: dto
    });
  }

  async findAll() {
    return this.prisma.inventario.findMany();
  }

  async findOne(id: number) {
    return this.prisma.inventario.findUnique({
      where: { Cod_Inventario: id }
    });
  }

  async update(id: number, dto: UpdateInventarioDto) {
    return this.prisma.inventario.update({
      where: { Cod_Inventario: id },
      data: dto
    });
  }

  async remove(id: number) {
    return this.prisma.inventario.delete({
      where: { Cod_Inventario: id }
    });
  }
}
