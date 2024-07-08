import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { hash } from 'bcrypt';
import { CreateRoleDto } from './dto/role.dto';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateRoleDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.role
      }
    });

    if (user) {
      throw new Error('Correo duplicado');
    }

    const newRole = await this.prisma.role.create({
      data: {
        ...dto
      }
    });
    const { ...result } = newRole;
    return result;
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email
      }
    });
  }
  async findById(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id
      }
    });
  }
}
