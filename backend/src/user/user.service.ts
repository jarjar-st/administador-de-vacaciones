import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUsuarioDto } from './dto/user.dto';
import { hash } from 'bcrypt';
import { UpdateUsuarioDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUsuarioDto) {
    console.log('create method called with dto:', dto);
    // console.log("ESTE ES EL METODO DE CREAR")
    // Verificar si el Correo ya está en uso en CorreoElectronico
    const existingEmail = await this.prisma.usuarios.findUnique({
      where: {
        CorreoElectronico: dto.Usuario.CorreoElectronico
      }
    });

    if (existingEmail) {
      throw new BadRequestException('El Correo ya está en uso');
    }

    // Hash de la contraseña si se proporciona
    const hashedPassword = dto.Usuario.Contrasena
      ? await hash(dto.Usuario.Contrasena, 10)
      : null;

    // Crear la entidad Persona y relaciones
    const persona = await this.prisma.personas.create({
      data: {
        Nombre: dto.Nombre,
        Apellido: dto.Apellido,
        Identidad: dto.Identidad,
        Fecha_Nacimiento: dto.Fecha_Nacimiento,
        Edad: dto.Edad,
        Genero: dto.Genero,
        Estado_Civil: dto.Estado_Civil,
        Direccion: dto.Direccion,
        Telefono: dto.Telefono
      }
    });

    // Crear el empleado asociado a la persona
    await this.prisma.empleados.create({
      data: {
        Cod_Persona: persona.Cod_Persona,
        Cod_Departamento: dto.Empleado.Cod_Departamento,
        Cod_Cargo: dto.Empleado.Cod_Cargo,
        Fecha_Contrato: dto.Empleado.Fecha_Contrato
      }
    });

    // Crear el Usuarios asociado a la persona

    const usuario = await this.prisma.usuarios.create({
      data: {
        Cod_Persona: persona.Cod_Persona,
        CorreoElectronico: dto.Usuario.CorreoElectronico,
        Contrasena: hashedPassword,
        Cod_EstadoUsuario: dto.Usuario.Cod_EstadoUsuario,
        Cod_Rol: dto.Usuario.Cod_Rol,
        Intentos_Fallidos: '0',
        Fecha_Creacion: new Date(),
        Creado_Por: dto.Usuario.Creado_Por,
        Fecha_Modificacion: new Date(),
        Modificado_Por: dto.Usuario.Modificado_Por
      }
    });

    console.log('Usuario created with ID:', usuario.Cod_Usuario);

    // Retornar el resultado sin la contraseña
    const { Contrasena, ...result } = usuario;
    return result;
  }

  async findByEmail(email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    // Encontrar el usuario por Correo electrónico en CorreoElectronico y luego obtener la persona
    const Correo = await this.prisma.usuarios.findFirst({
      where: { CorreoElectronico: email },
      include: { Persona: true } // Incluye los datos de la persona
    });

    if (!Correo) {
      throw new BadRequestException('Usuario no encontrado');
    }

    const persona = Correo.Persona;

    console.log(persona.Cod_Persona);

    try {
      // Buscar el usuario asociado a la persona
      const usuario = await this.prisma.usuarios.findFirst({
        where: { Cod_Persona: persona.Cod_Persona },
        include: { Persona: true, Rol: true, EstadoUsuario: true }
      });
      console.log(usuario);
      return usuario;
    } catch (error) {
      console.error('Error al buscar el usuario:', error);
      throw new BadRequestException('Error al buscar el usuario');
    }
  }

  async findById(id: number) {
    // Buscar el usuario por el ID del usuario
    const usuario = await this.prisma.usuarios.findUnique({
      where: { Cod_Usuario: id },
      select: {
        Persona: {
          select: {
            Cod_Persona: true,
            Nombre: true,
            Apellido: true,
            Identidad: true,
            Fecha_Nacimiento: true,
            Genero: true,
            Estado_Civil: true,
            Direccion: true,
            Telefono: true,
            Empleado: {
              select: {
                Cod_Departamento: true,
                Cod_Cargo: true,
                Fecha_Contrato: true
              }
            },
            Usuario: {
              select: {
                CorreoElectronico: true,
                Contrasena: true,
                Cod_Rol: true,
                Cod_EstadoUsuario: true
              }
            }
          }
        }
      }
    });
    return usuario;
  }

  async findAll() {
    console.log('findAll method called');
    const personas = await this.prisma.personas.findMany({
      include: {
        Empleado: {
          include: {
            Departamento: true, // Incluye todos los campos de Departamento
            Cargo: true // Incluye todos los campos de Cargo
          }
        },
        Usuario: {
          include: {
            Rol: true, // Incluye todos los campos de Rol
            EstadoUsuario: true // Incluye todos los campos de EstadoUsuario
          }
        }
      }
    });

    // Formatear las fechas
    return personas.map((persona) => ({
      ...persona,
      Fecha_Nacimiento: persona.Fecha_Nacimiento.toISOString().split('T')[0],
      Empleado: persona.Empleado
        ? {
            ...persona.Empleado,
            Fecha_Contrato:
              persona.Empleado.Fecha_Contrato.toISOString().split('T')[0]
          }
        : null
    }));
  }

  async allRoles() {
    const roles = await this.prisma.roles.findMany();
    console.log('AQUI ESTA ESTOOOOOOO', roles);
    return roles;
  }

  async allDepartamentos() {
    return this.prisma.departamento.findMany();
  }

  async allCargos() {
    return this.prisma.cargo.findMany();
  }

  async update(id: number, dto: CreateUsuarioDto) {
    const existingUser = await this.prisma.usuarios.findUnique({
      where: { Cod_Usuario: id },
      include: { Persona: true }
    });

    if (!existingUser) {
      throw new BadRequestException('Usuario no encontrado');
    }

    // Hash de la nueva contraseña si se proporciona
    const hashedPassword = dto.Usuario.Contrasena
      ? await hash(dto.Usuario.Contrasena, 10)
      : existingUser.Contrasena;

    // Actualizar la entidad Persona y relaciones
    const persona = await this.prisma.personas.update({
      where: { Cod_Persona: existingUser.Cod_Persona },
      data: {
        Nombre: dto.Nombre,
        Apellido: dto.Apellido,
        Identidad: dto.Identidad,
        Fecha_Nacimiento: dto.Fecha_Nacimiento,
        Genero: dto.Genero,
        Estado_Civil: dto.Estado_Civil,
        Direccion: dto.Direccion,
        Telefono: dto.Telefono
      }
    });

    // Actualizar el empleado asociado a la persona
    await this.prisma.empleados.update({
      where: { Cod_Persona: persona.Cod_Persona },
      data: {
        Cod_Departamento: dto.Empleado.Cod_Departamento,
        Cod_Cargo: dto.Empleado.Cod_Cargo,
        Fecha_Contrato: dto.Empleado.Fecha_Contrato
      }
    });

    // Actualizar el usuario asociado a la persona
    const usuario = await this.prisma.usuarios.update({
      where: { Cod_Persona: persona.Cod_Persona },
      data: {
        CorreoElectronico: dto.Usuario.CorreoElectronico,
        Contrasena: hashedPassword,
        Cod_EstadoUsuario: dto.Usuario.Cod_EstadoUsuario,
        Cod_Rol: dto.Usuario.Cod_Rol,
        Intentos_Fallidos: '0',
        Fecha_Modificacion: dto.Usuario.Fecha_Modificacion,
        Modificado_Por: dto.Usuario.Modificado_Por
      }
    });

    console.log('Usuario updated with ID:', usuario.Cod_Usuario);

    const { Contrasena, ...result } = usuario;
    return result;
  }
}
