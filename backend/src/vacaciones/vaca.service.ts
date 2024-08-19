import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateVacaDto } from './dto/create-vaca.dto';
import { UpdateVacaDto } from './dto/update-vaca.dto';
import { differenceInDays } from 'date-fns';
import { format, addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { TwilioService } from 'src/twilio/twilio.service';

@Injectable()
export class VacaService {
  constructor(
    private prisma: PrismaService,
    private twilioService: TwilioService
  ) {}

  async create(dto: CreateVacaDto) {
    const diasSolicitados = differenceInDays(dto.Fecha_Fin, dto.Fecha_Inicio);

    if (diasSolicitados <= 0) {
      throw new BadRequestException(
        'La fecha de fin debe ser posterior a la fecha de inicio.'
      );
    }

    const empleado = await this.prisma.empleados.findUnique({
      where: { Cod_Empleado: dto.Cod_Empleado }
    });

    if (!empleado) {
      throw new BadRequestException('Empleado no encontrado.');
    }

    const nombre = await this.prisma.personas.findUnique({
      where: { Cod_Persona: empleado.Cod_Persona }
    });

    if (empleado.Dias_Vacaciones_Acumulados < diasSolicitados) {
      throw new BadRequestException(
        `No tienes suficientes días de vacaciones disponibles. ${empleado.Dias_Vacaciones_Acumulados} días disponibles.`
      );
    }

    const vaca = await this.prisma.vacaciones.create({
      data: {
        Cod_Empleado: dto.Cod_Empleado,
        Fecha_Inicio: dto.Fecha_Inicio,
        Fecha_Fin: dto.Fecha_Fin,
        Dias_Solicitados: diasSolicitados,
        Estado_Solicitud: dto.Estado_Solicitud || 'Pendiente'
      }
    });

    // Enviar SMS al administrador
    const adminPhoneNumber = '+50489277509';

    // Función para formatear la fecha
    function formatearFecha(fecha: Date): string {
      const fechaConUnDiaMas = addDays(fecha, 1);
      return format(fechaConUnDiaMas, "d 'de' MMMM yyyy", { locale: es });
    }

    const fechaInicioFormateada = formatearFecha(dto.Fecha_Inicio);
    const fechaFinFormateada = formatearFecha(dto.Fecha_Fin);

    const message = `Hola Admin, se ha creado una nueva solicitud de vacaciones para el empleado ${nombre.Nombre} ${nombre.Apellido} desde el ${fechaInicioFormateada} hasta el ${fechaFinFormateada}.`;

    console.log('ESTE ES EL MENSAJE', message);
    console.log('ESTA ES LA FECHA DE INICIO FORMATEADA', fechaInicioFormateada);
    console.log('ESTA ES LA FECHA DE FIN FORMATEADA', fechaFinFormateada);

    await this.twilioService.sendSms(adminPhoneNumber, message);

    // Actualizar los días de vacaciones acumulados
    // await this.prisma.empleados.update({
    //   where: { Cod_Empleado: dto.Cod_Empleado },
    //   data: {
    //     Dias_Vacaciones_Acumulados:
    //       empleado.Dias_Vacaciones_Acumulados - diasSolicitados
    //   }
    // });

    return vaca;
  }

  async findAll() {
    return await this.prisma.vacaciones.findMany({
      include: {
        Empleado: {
          include: {
            Persona: true
          }
        }
      }
    });
  }

  async findOne(id: number) {
    return await this.prisma.vacaciones.findUnique({
      where: { Cod_Vacacion: id },
      include: { Empleado: true }
    });
  }

  async update(id: number, dto: UpdateVacaDto) {
    const diasSolicitados = differenceInDays(dto.Fecha_Fin, dto.Fecha_Inicio);

    if (diasSolicitados <= 0) {
      throw new BadRequestException(
        'La fecha de fin debe ser posterior a la fecha de inicio.'
      );
    }

    return await this.prisma.vacaciones.update({
      where: { Cod_Vacacion: id },
      data: {
        ...dto,
        Dias_Solicitados: diasSolicitados
      }
    });
  }

  async remove(id: number) {
    return await this.prisma.vacaciones.delete({
      where: { Cod_Vacacion: id }
    });
  }

  async approveOrDeny(id: number, aprobado: string) {
    console.log('ESTE ES EL Aprobado:', aprobado['aprobado']);

    const vacacion = await this.prisma.vacaciones.findUnique({
      where: { Cod_Vacacion: id }
    });

    if (!vacacion) {
      throw new BadRequestException('Vacación no encontrada.');
    }

    const empleado = await this.prisma.empleados.findUnique({
      where: { Cod_Empleado: vacacion.Cod_Empleado }
    });

    // Obtener el estado actual de la solicitud
    const estadoActual = vacacion.Estado_Solicitud;

    const estadoSolicitud = await this.prisma.vacaciones.update({
      where: { Cod_Vacacion: id },
      data: {
        Estado_Solicitud: aprobado['aprobado']
      }
    });

    if (aprobado['aprobado'] === 'Aceptado') {
      await this.prisma.empleados.update({
        where: { Cod_Empleado: vacacion.Cod_Empleado },
        data: {
          Dias_Vacaciones_Acumulados: Math.max(
            empleado.Dias_Vacaciones_Acumulados - vacacion.Dias_Solicitados,
            0
          )
        }
      });
    } else if (
      estadoActual === 'Aceptado' &&
      aprobado['aprobado'] === 'Rechazado'
    ) {
      await this.prisma.empleados.update({
        where: { Cod_Empleado: vacacion.Cod_Empleado },
        data: {
          Dias_Vacaciones_Acumulados:
            empleado.Dias_Vacaciones_Acumulados + vacacion.Dias_Solicitados
        }
      });
    }

    return estadoSolicitud;
  }

  async getDiasVacacionesDisponibles(Cod_Empleado: number) {
    const empleado = await this.prisma.empleados.findUnique({
      where: { Cod_Empleado },
      select: { Dias_Vacaciones_Acumulados: true }
    });

    if (!empleado) {
      throw new BadRequestException('Empleado no encontrado.');
    }

    return empleado.Dias_Vacaciones_Acumulados;
  }
}
