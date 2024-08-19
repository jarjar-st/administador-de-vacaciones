import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { TwilioService } from 'src/twilio/twilio.service';
import { addDays, format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

@Injectable()
export class ReservaService {
  constructor(
    private prisma: PrismaService,
    private twilioService: TwilioService
  ) {}

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

    // Enviar correo de confirmación de reserva
    const usuario = await this.prisma.usuarios.findUnique({
      where: { Cod_Usuario: dto.Cod_Usuario },
      include: { Persona: true }
    });

    const sala = await this.prisma.salas.findUnique({
      where: { Cod_Sala: dto.Cod_Sala }
    });

    // Enviar SMS al administrador
    const adminPhoneNumber = '+50489277509';
    // const fechaObj = new Date(dto.Fecha_Reserva);
    // const fechaFormateada = () =>
    //   format(fechaObj, "d 'de' MMMM yyyy", { locale: es });

    // Función para formatear la fecha
    function formatearFecha(fecha: Date): string {
      // const fechaObj = parseISO(fecha);
      const fechaConUnDiaMas = addDays(fecha, 1);
      return format(fechaConUnDiaMas, "d 'de' MMMM yyyy", { locale: es });
    }

    // Función para formatear la hora
    function formatearHora(hora: Date): string {
      // const horaObj = parseISO(hora);
      return format(hora, 'hh:mm a');
    }

    const fechaFormateada = formatearFecha(dto.Fecha_Reserva);
    const horaInicioFormateada = formatearHora(dto.Hora_Inicio);
    const horaFinFormateada = formatearHora(dto.Hora_Fin);

    const message = `Hola Admin, se ha creado una nueva reserva para la sala ${sala.Nombre_Sala} en la fecha ${fechaFormateada} de ${horaInicioFormateada} a ${horaFinFormateada}.`;

    console.log('ESTE ES EL MENSAJE', message);
    console.log('ESTE ES LA FECHA FORMATEADA', fechaFormateada);
    console.log('ESTE ES LA HORA DE INICIO', horaInicioFormateada);
    console.log('ESTE ES LA HORA DE FIN', horaFinFormateada);

    await this.twilioService.sendSms(adminPhoneNumber, message);

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
    console.log('ESTA ES LA DATA DEL UPDATE', dto);
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
