import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUsuarioDto } from './dto/user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUsuarioDto) {
    console.log('create method called with dto:', dto);
    // Verificar si el correo ya está en uso en CorreoElectronico
    const existingEmail = await this.prisma.correo_Electronico.findUnique({
      where: {
        Correo: dto.correosElectronicos[0].correo // Asumiendo que siempre hay al menos un correo en el array
      }
    });

    if (existingEmail) {
      throw new BadRequestException('El correo ya está en uso');
    }

    // Hash de la contraseña si se proporciona
    const hashedPassword = dto.usuario.contrasena
      ? await hash(dto.usuario.contrasena, 10)
      : null;

    // Crear la entidad Persona y relaciones
    const persona = await this.prisma.personas.create({
      data: {
        Nombre: dto.nombre,
        Apellido: dto.apellido,
        Identidad: dto.identidad,
        Fecha_Nacimiento: dto.fechaNacimiento,
        Genero: dto.genero,
        Estado_Civil: dto.estadoCivil,
        Direccion: dto.direccion,
        Telefonos: {
          create: dto.telefonos.map((telefono) => ({
            Telefono: parseInt(telefono.telefono)
          }))
        },
        CorreoElectronico: {
          create: dto.correosElectronicos.map((correo) => ({
            Correo: correo.correo
          }))
        }
      }
    });

    // Crear el empleado asociado a la persona
    await this.prisma.empleados.create({
      data: {
        Cod_Persona: persona.Cod_Persona,
        Cod_Departamento: dto.empleado.codDepartamento,
        Cod_Cargo: dto.empleado.codCargo,
        Fecha_Contrato: dto.empleado.fechaContrato
      }
    });

    // Crear el usuario asociado a la persona

    const usuario = await this.prisma.usuarios.create({
      data: {
        Cod_Persona: persona.Cod_Persona,
        Contrasena: hashedPassword,
        Cod_EstadoUsuario: dto.usuario.codEstadoUsuario,
        Cod_Rol: dto.usuario.codRol,
        Intentos_Fallidos: dto.usuario.intentosFallidos?.toString() || '0',
        Fecha_Creacion: new Date(),
        Creado_Por: dto.usuario.creadoPor,
        Fecha_Modificacion: new Date(),
        Modificado_Por: dto.usuario.modificadoPor || dto.usuario.creadoPor
      }
    });

    console.log('Usuario created with ID:', usuario.Cod_Usuario);

    // Retornar el resultado sin la contraseña
    const { Contrasena, ...result } = usuario;
    return result;
  }

  async findByEmail(email: string) {
    // Encontrar el usuario por correo electrónico en CorreoElectronico y luego obtener la persona
    const correo = await this.prisma.correo_Electronico.findFirst({
      where: { Correo: email },
      include: { Persona: true } // Incluye los datos de la persona
    });

    if (!correo) {
      throw new BadRequestException('Usuario no encontrado');
    }

    // Buscar el usuario asociado a la persona
    return this.prisma.usuarios.findFirst({
      where: { Cod_Persona: correo.Cod_Persona },
      include: { Persona: true, Rol: true, EstadoUsuario: true }
    });
  }

  async findById(id: number) {
    // Buscar el usuario por el ID del usuario
    return await this.prisma.usuarios.findUnique({
      where: { Cod_Usuario: id },
      include: { Persona: true, Rol: true, EstadoUsuario: true }
    });
  }

  async findAll() {
    return this.prisma.personas.findMany();
  }
}
