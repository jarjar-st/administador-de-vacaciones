import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';

@Injectable()
export class ReservaService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateReservaDto) {
    const existingReserva = await this.prisma.reservasGrabacion.findFirst({
      where: {
        Cod_Sala: dto.Cod_Sala,
        Hora_Inicio: { lte: dto.Hora_Fin },
        Hora_Fin: { gte: dto.Hora_Inicio },
        OR: [{ Estado_Reserva: 'Pendiente' }, { Estado_Reserva: 'Aprobada' }]
      }
    });

    if (existingReserva) {
      throw new BadRequestException(
        'La sala ya está reservada en ese horario.'
      );
    }

    return await this.prisma.reservasGrabacion.create({
      data: {
        Cod_Usuario: dto.Cod_Usuario,
        Cod_Sala: dto.Cod_Sala,
        Fecha_Reserva: dto.Fecha_Reserva,
        Hora_Inicio: dto.Hora_Inicio,
        Hora_Fin: dto.Hora_Fin,
        Estado_Reserva: dto.Estado_Reserva || 'Pendiente'
      }
    });
  }

  async findAll() {
    return await this.prisma.reservasGrabacion.findMany({
      include: { Usuario: true, Sala: true }
    });
  }

  async findOne(id: number) {
    return await this.prisma.reservasGrabacion.findUnique({
      where: { Cod_Reserva: id },
      include: { Usuario: true, Sala: true }
    });
  }

  async update(id: number, dto: UpdateReservaDto) {
    return await this.prisma.reservasGrabacion.update({
      where: { Cod_Reserva: id },
      data: { ...dto }
    });
  }

  async remove(id: number) {
    return await this.prisma.reservasGrabacion.delete({
      where: { Cod_Reserva: id }
    });
  }
}
