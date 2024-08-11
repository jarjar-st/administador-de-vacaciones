import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUsuarioDto } from './dto/user.dto';
import { hash } from 'bcrypt';
import { UpdateUsuarioDto } from './dto/update-user.dto';
import { start } from 'repl';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  calculateVacationDays = (startDate: Date): number => {
    const currentDate = new Date();
    const msPerDay = 24 * 60 * 60 * 1000;
    const daysWorked = Math.floor(
      (currentDate.getTime() - startDate.getTime()) / msPerDay
    );
    console.log('DAYS WORKED:', daysWorked);

    if (daysWorked < 360) {
      return (10 / 360) * daysWorked;
    } else if (daysWorked < 720) {
      return 10 + (12 / 360) * (daysWorked - 360);
    } else if (daysWorked < 1080) {
      return 22 + (15 / 360) * (daysWorked - 720);
    } else if (daysWorked < 1440) {
      return 37 + (20 / 360) * (daysWorked - 1080);
    } else {
      return 57 + (20 / 360) * (daysWorked - 1440);
    }
  };

  async create(dto: CreateUsuarioDto) {
    console.log('create method called with dto:', dto);
    // Verificar si el Correo ya está en uso en CorreoElectronico
    const existingEmail = await this.prisma.usuarios.findUnique({
      where: {
        CorreoElectronico: dto.CorreoElectronico
      }
    });

    if (existingEmail) {
      throw new BadRequestException('El Correo ya está en uso');
    }

    // Hash de la contraseña si se proporciona
    const hashedPassword = dto.Contrasena
      ? await hash(dto.Contrasena, 10)
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
    const empleado = await this.prisma.empleados.create({
      data: {
        Cod_Persona: persona.Cod_Persona,
        Cod_Departamento: dto.Cod_Departamento,
        Cod_Cargo: dto.Cod_Cargo,
        Fecha_Contrato: dto.Fecha_Contrato
      }
    });

    // Calcular los días de vacaciones acumulados al momento de la creación
    const diasVacacionesAcumulados = this.calculateVacationDays(
      new Date(dto.Fecha_Contrato)
    );
    await this.prisma.empleados.update({
      where: { Cod_Empleado: empleado.Cod_Empleado },
      data: { Dias_Vacaciones_Acumulados: diasVacacionesAcumulados }
    });

    // Crear el Usuarios asociado a la persona

    const usuario = await this.prisma.usuarios.create({
      data: {
        Cod_Persona: persona.Cod_Persona,
        CorreoElectronico: dto.CorreoElectronico,
        Contrasena: hashedPassword,
        Cod_EstadoUsuario: dto.Cod_EstadoUsuario,
        Cod_Rol: dto.Cod_Rol,
        Intentos_Fallidos: dto.Intentos_Fallidos?.toString() || '0',
        Fecha_Creacion: new Date(),
        Creado_Por: 'Admin',
        Fecha_Modificacion: new Date(),
        Modificado_Por: 'Admin'
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
    return await this.prisma.usuarios.findUnique({
      where: { Cod_Usuario: id },
      include: { Persona: true, Rol: true, EstadoUsuario: true }
    });
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

    const result = personas.map((persona) => ({
      // ...persona,
      Cod_Persona: persona.Cod_Persona,
      Nombre: persona.Nombre,
      Apellido: persona.Apellido,
      Identidad: persona.Identidad,
      Fecha_Nacimiento: persona.Fecha_Nacimiento,
      Edad: persona.Edad,
      Genero: persona.Genero,
      Estado_Civil: persona.Estado_Civil,
      Direccion: persona.Direccion,
      Telefono: persona.Telefono,
      ...persona.Empleado,
      ...persona.Empleado.Departamento,
      ...persona.Empleado.Cargo,
      ...persona.Usuario,
      ...persona.Usuario.Rol,
      ...persona.Usuario.EstadoUsuario
      // ...persona.Usuario.CorreoElectronico
      // ...persona.Usuario.EstadoUsuario.Descripcion
    }));

    return result;
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
      console.log('Usuario no encontrado: ', id);
      throw new BadRequestException('Usuario no encontrado');
    }

    //   // Hash de la nueva contraseña si se proporciona
    const hashedPassword = dto.Contrasena
      ? await hash(dto.Contrasena, 10)
      : existingUser.Contrasena;

    //   // Actualizar la entidad Persona y relaciones
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

    //   // Actualizar el empleado asociado a la persona
    await this.prisma.empleados.update({
      where: { Cod_Persona: persona.Cod_Persona },
      data: {
        Cod_Departamento: dto.Cod_Departamento,
        Cod_Cargo: dto.Cod_Cargo,
        Fecha_Contrato: dto.Fecha_Contrato
      }
    });

    //   // Actualizar el usuario asociado a la persona
    const usuario = await this.prisma.usuarios.update({
      where: { Cod_Persona: persona.Cod_Persona },
      data: {
        Contrasena: hashedPassword,
        Cod_EstadoUsuario: dto.Cod_EstadoUsuario,
        Cod_Rol: dto.Cod_Rol,
        Intentos_Fallidos: dto.Intentos_Fallidos?.toString() || '0',
        Fecha_Creacion: new Date(),
        Creado_Por: 'Admin',
        Fecha_Modificacion: new Date(),
        Modificado_Por: 'Admin',
        CorreoElectronico: dto.CorreoElectronico
      }
    });

    console.log('Usuario updated with ID:', usuario.Cod_Usuario);

    const { Contrasena, ...result } = usuario;
    return result;
  }

  async updateUserStatus(id: number, isActive: boolean) {
    // console.log("AQUII ESTA EL CAMBIO DE ESTADOOOOO", id, isActive);
    const user = await this.prisma.usuarios.findUnique({
      where: { Cod_Usuario: id }
    });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    const currentUser = await this.prisma.usuarios.findUnique({
      where: { Cod_Usuario: id },
      select: { Cod_EstadoUsuario: true }
    });

    const newCodEstadoUsuario = currentUser.Cod_EstadoUsuario === 1 ? 2 : 1;

    const userUpdated = await this.prisma.usuarios.update({
      where: { Cod_Usuario: id },
      data: { Cod_EstadoUsuario: newCodEstadoUsuario }
    });
    // user.Cod_EstadoUsuario = isActive ? 1 : 0;
    console.log('Usuario updated with ID:', userUpdated);
    return userUpdated;
  }
}
