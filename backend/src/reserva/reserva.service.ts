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

    const reserva = await this.prisma.reservasGrabacion.create({
      data: {
        Cod_Usuario: dto.Cod_Usuario,
        Cod_Sala: dto.Cod_Sala,
        Fecha_Reserva: dto.Fecha_Reserva,
        Hora_Inicio: dto.Hora_Inicio,
        Hora_Fin: dto.Hora_Fin,
        Estado_Reserva: dto.Estado_Reserva || 'Pendiente'
      }
    });

    if (dto.Inventario && dto.Inventario.length > 0) {
      const reservasInventario = dto.Inventario.map((item) => ({
        Cod_Reserva: reserva.Cod_Reserva,
        Cod_Inventario: item.Cod_Inventario,
        CantidadSolicitada: item.CantidadSolicitada
      }));

      await this.prisma.reservasInventario.createMany({
        data: reservasInventario
      });
    }

    return reserva;
  }

  async findAll() {
    const reservas = await this.prisma.reservasGrabacion.findMany({
      include: {
        Usuario: {
          include: {
            Persona: true
          }
        },
        Sala: true,
        ReservasInventario: {
          include: {
            Inventario: true
          }
        }
      }
    });

    const formattedReservas = reservas.map((reserva) => ({
      Cod_Reserva: reserva.Cod_Reserva,
      Cod_Usuario: reserva.Cod_Usuario,
      Usuario: `${reserva.Usuario.Persona.Nombre} ${reserva.Usuario.Persona.Apellido}`,
      Cod_Sala: reserva.Cod_Sala,
      Nombre_Sala: reserva.Sala.Nombre_Sala,
      Fecha_Reserva: reserva.Fecha_Reserva,
      Hora_Inicio: reserva.Hora_Inicio,
      Hora_Fin: reserva.Hora_Fin,
      Estado_Reserva: reserva.Estado_Reserva,
      Inventario: reserva.ReservasInventario.map((item) => ({
        Nombre_Item: item.Inventario.Nombre_Item,
        CantidadSolicitada: item.CantidadSolicitada
      }))
    }));

    return formattedReservas;
  }

  async findOne(id: number) {
    return await this.prisma.reservasGrabacion.findUnique({
      where: { Cod_Reserva: id },
      include: { Usuario: true, Sala: true }
    });
  }

  async update(id: number, dto: UpdateReservaDto) {
    console.log("ESTA ES LA DATA DEL UPDATE", dto);
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

  async findAllSalas() {
    return await this.prisma.salas.findMany();
  }

  async findAllInventario() {
    return await this.prisma.inventario.findMany();
  }
}
