import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateRoleDto, UpdateRoleDto, AssignPermissionDto } from './dto';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async createRole(dto: CreateRoleDto) {
    return this.prisma.roles.create({
      data: {
        Rol: dto.Rol,
        Descripcion: dto.Descripcion,
        Creado_Por: dto.Creado_Por
      }
    });
  }

  async assignPermission(dto: AssignPermissionDto) {
    const role = await this.prisma.roles.findUnique({
      where: { Cod_Rol: dto.Cod_Rol }
    });

    if (!role) {
      throw new Error('Role not found');
    }

    return this.prisma.rolePermisos.create({
      data: {
        Cod_Rol: dto.Cod_Rol,
        Cod_Permiso: dto.Cod_Permiso
      }
    });
  }

  async removePermission(dto: AssignPermissionDto) {
    return this.prisma.rolePermisos.delete({
      where: {
        Cod_Rol_Cod_Permiso: {
          Cod_Rol: dto.Cod_Rol,
          Cod_Permiso: dto.Cod_Permiso
        }
      }
    });
  }

  async getAllRoles() {
    return this.prisma.roles.findMany();
  }

  async getPermissionsByRole(Cod_Rol: number) {
    return this.prisma.rolePermisos.findMany({
      where: { Cod_Rol },
      include: { Permisos: true }
    });
  }
}
