import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { AssignPermissionDto } from './dto/assign-permission.dto';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async createRole(dto: CreateRoleDto) {
    return this.prisma.roles.create({
      data: {
        Rol: dto.Rol,
        Descripcion: dto.Descripcion,
        Creado_Por: dto.Creado_Por,
        Modificado_Por: dto.Modificado_Por
      }
    });
  }

  async assignPermission(dto: AssignPermissionDto) {
    const role = await this.prisma.roles.findUnique({
      where: { Cod_Rol: dto.Cod_Rol }
    });

    if (!role) {
      throw new Error('Role no encontrado');
    }

    const existingPermissions = await this.prisma.rolePermisos.findMany({
      where: { Cod_Rol: dto.Cod_Rol }
    });

    const existingPermissionIds = new Set(
      existingPermissions.map((p) => p.Cod_Permiso)
    );

    const newPermissions = dto.Cod_Permisos.filter(
      (Cod_Permiso) => !existingPermissionIds.has(Cod_Permiso)
    ).map((Cod_Permiso) => ({
      Cod_Rol: dto.Cod_Rol,
      Cod_Permiso
    }));

    const permissionsToRemove = existingPermissions.filter(
      (p) => !dto.Cod_Permisos.includes(p.Cod_Permiso)
    );

    // Remover los permisos que no estan en la lista
    if (permissionsToRemove.length > 0) {
      await this.prisma.rolePermisos.deleteMany({
        where: {
          Cod_Rol: dto.Cod_Rol,
          Cod_Permiso: { in: permissionsToRemove.map((p) => p.Cod_Permiso) }
        }
      });
    }

    // Agregar los nuevos permisos
    if (newPermissions.length > 0) {
      await this.prisma.rolePermisos.createMany({
        data: newPermissions
      });
    }

    return {
      added: newPermissions.length,
      removed: permissionsToRemove.length
    };
  }

  // async removePermission(dto: AssignPermissionDto) {
  //   return this.prisma.rolePermisos.delete({
  //     where: {
  //       Cod_Rol_Cod_Permiso: {
  //         Cod_Rol: dto.Cod_Rol,
  //         Cod_Permiso: dto.Cod_Permiso
  //       }
  //     }
  //   });
  // }

  async getAllRoles() {
    return this.prisma.roles.findMany();
  }

  async getAllPermisos() {
    return this.prisma.permisos.findMany();
  }

  async getPermissionsByRole(Cod_Rol: number) {
    return this.prisma.rolePermisos.findMany({
      where: { Cod_Rol },
      include: { Permisos: true }
    });
  }
}
