import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateVacaDto } from './dto/create-vaca.dto';
import { UpdateVacaDto } from './dto/update-vaca.dto';
import { differenceInDays } from 'date-fns';

@Injectable()
export class VacaService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateVacaDto) {
    const diasSolicitados = differenceInDays(dto.Fecha_Fin, dto.Fecha_Inicio);

    if (diasSolicitados <= 0) {
      throw new BadRequestException(
        'La fecha de fin debe ser posterior a la fecha de inicio.'
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

  async approveOrDeny(id: number, approve: boolean) {
    const estado = approve ? 'Aprobado' : 'Denegado';

    return await this.prisma.vacaciones.update({
      where: { Cod_Vacacion: id },
      data: {
        Estado_Solicitud: estado
      }
    });
  }
}
