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
    // Verificar si el Correo ya está en uso en CorreoElectronico
    const existingEmail = await this.prisma.correo_Electronico.findUnique({
      where: {
        Correo: dto.CorreoElectronico[0].Correo // Asumiendo que siempre hay al menos un Correo en el array
      }
    });

    if (existingEmail) {
      throw new BadRequestException('El Correo ya está en uso');
    }

    // Hash de la contraseña si se proporciona
    const hashedPassword = dto.Usuarios.Contrasena
      ? await hash(dto.Usuarios.Contrasena, 10)
      : null;

    // Crear la entidad Persona y relaciones
    const persona = await this.prisma.personas.create({
      data: {
        Nombre: dto.Nombre,
        Apellido: dto.Apellido,
        Identidad: dto.Identidad,
        Fecha_Nacimiento: dto.Fecha_Nacimiento,
        Genero: dto.Genero,
        Estado_Civil: dto.Estado_Civil,
        Direccion: dto.Direccion,
        Telefonos: {
          create: dto.Telefonos.map((telefono) => ({
            Telefono: parseInt(telefono.Telefono)
          }))
        },
        CorreoElectronico: {
          create: dto.CorreoElectronico.map((Correo) => ({
            Correo: Correo.Correo
          }))
        }
      }
    });

    // Crear el empleado asociado a la persona
    await this.prisma.empleados.create({
      data: {
        Cod_Persona: persona.Cod_Persona,
        Cod_Departamento: dto.Empleados.Cod_Departamento,
        Cod_Cargo: dto.Empleados.Cod_Cargo,
        Fecha_Contrato: dto.Empleados.Fecha_Contrato
      }
    });

    // Crear el Usuarios asociado a la persona

    const usuario = await this.prisma.usuarios.create({
      data: {
        Cod_Persona: persona.Cod_Persona,
        Contrasena: hashedPassword,
        Cod_EstadoUsuario: dto.Usuarios.Cod_EstadoUsuario,
        Cod_Rol: dto.Usuarios.Cod_Rol,
        Intentos_Fallidos: dto.Usuarios.Intentos_Fallidos?.toString() || '0',
        Fecha_Creacion: new Date(),
        Creado_Por: dto.Usuarios.Creado_Por,
        Fecha_Modificacion: new Date(),
        Modificado_Por: dto.Usuarios.Modificado_Por || dto.Usuarios.Creado_Por
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
    const Correo = await this.prisma.correo_Electronico.findFirst({
      where: { Correo: email },
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
    return await this.prisma.usuarios.findUnique({
      where: { Cod_Usuario: id },
      include: { Persona: true, Rol: true, EstadoUsuario: true }
    });
  }

  async findAll() {
    console.log('findAll method called');
    return this.prisma.personas.findMany({
      include: {
        Telefonos: true, // Incluye todos los campos de Telefonos
        CorreoElectronico: true, // Incluye todos los campos de CorreoElectronico
        Empleados: {
          include: {
            Departamento: true, // Incluye todos los campos de Departamento
            Cargo: true // Incluye todos los campos de Cargo
          }
        },
        Usuarios: {
          include: {
            Rol: true, // Incluye todos los campos de Rol
            EstadoUsuario: true // Incluye todos los campos de EstadoUsuario
          }
        }
      }
    });
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

  async update(id: number, dto: UpdateUsuarioDto) {
    const existingUser = await this.prisma.usuarios.findUnique({
      where: { Cod_Usuario: id },
      include: { Persona: true }
    });

    if (!existingUser) {
      throw new BadRequestException('Usuario no encontrado');
    }

    // Hash de la nueva contraseña si se proporciona
    const hashedPassword = dto.usuario.contrasena
      ? await hash(dto.usuario.contrasena, 10)
      : existingUser.Contrasena;

    // Actualizar la entidad Persona y relaciones
    const persona = await this.prisma.personas.update({
      where: { Cod_Persona: existingUser.Cod_Persona },
      data: {
        Nombre: dto.nombre,
        Apellido: dto.apellido,
        Identidad: dto.identidad,
        Fecha_Nacimiento: dto.fechaNacimiento,
        Genero: dto.genero,
        Estado_Civil: dto.estadoCivil,
        Direccion: dto.direccion,
        Telefonos: {
          deleteMany: {}, // Eliminar todos los teléfonos actuales
          create: dto.telefonos.map((telefono) => ({
            Telefono: parseInt(telefono.telefono)
          }))
        },
        CorreoElectronico: {
          deleteMany: {}, // Eliminar todos los correos actuales
          create: dto.correosElectronicos.map((Correo) => ({
            Correo: Correo.correo
          }))
        }
      }
    });

    // Actualizar el empleado asociado a la persona
    await this.prisma.empleados.update({
      where: { Cod_Persona: persona.Cod_Persona },
      data: {
        Cod_Departamento: dto.empleado.codDepartamento,
        Cod_Cargo: dto.empleado.codCargo,
        Fecha_Contrato: dto.empleado.fechaContrato
      }
    });

    // Actualizar el usuario asociado a la persona
    const usuario = await this.prisma.usuarios.update({
      where: { Cod_Persona: persona.Cod_Persona },
      data: {
        Contrasena: hashedPassword,
        Cod_EstadoUsuario: dto.usuario.codEstadoUsuario,
        Cod_Rol: dto.usuario.codRol,
        Intentos_Fallidos: dto.usuario.intentosFallidos?.toString() || '0',
        Fecha_Modificacion: new Date(),
        Modificado_Por: dto.usuario.modificadoPor || dto.usuario.creadoPor
      }
    });

    console.log('Usuario updated with ID:', usuario.Cod_Usuario);

    const { Contrasena, ...result } = usuario;
    return result;
  }
}
