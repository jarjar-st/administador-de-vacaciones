import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await hash('123', 10);

  // Seed Departamento
  const departamento = await prisma.departamento.create({
    data: {
      Departamento: 'IT'
    }
  });
  const departamentoDos = await prisma.departamento.create({
    data: {
      Departamento: 'Operaciones Técnicas'
    }
  });
  const departamentoTres = await prisma.departamento.create({
    data: {
      Departamento: 'Contabilidad'
    }
  });

  // Seed Cargo
  const cargo = await prisma.cargo.create({
    data: {
      Cargo: 'Gerente'
    }
  });
  const cargoDos = await prisma.cargo.create({
    data: {
      Cargo: 'Técnico'
    }
  });
  const cargoTres = await prisma.cargo.create({
    data: {
      Cargo: 'Secretaria'
    }
  });

  // Seed Estado_Usuario
  const estadoUsuario = await prisma.estado_Usuario.create({
    data: {
      Descripcion: 'Activo'
    }
  });
  const estadoUsuario2 = await prisma.estado_Usuario.create({
    data: {
      Descripcion: 'Inactivo'
    }
  });

  // Seed Roles
  const rolAdmin = await prisma.roles.create({
    data: {
      Rol: 'admin',
      Descripcion: 'Administrator role',
      Fecha_Creacion: new Date(),
      Creado_Por: 'system',
      Fecha_Modificacion: new Date(),
      Modificado_Por: 'system'
    }
  });
  const rolUser = await prisma.roles.create({
    data: {
      Rol: 'user',
      Descripcion: 'User role',
      Fecha_Creacion: new Date(),
      Creado_Por: 'system',
      Fecha_Modificacion: new Date(),
      Modificado_Por: 'system'
    }
  });

  // Seed Permisos
  const permisos = [
    {
      Nombre_Permiso: 'ver seguridad',
      Descripcion: 'Permite ver el módulo de seguridad'
    },
    {
      Nombre_Permiso: 'ver reserva sala',
      Descripcion: 'Permite ver el módulo de reserva de sala'
    },
    {
      Nombre_Permiso: 'ver inventario',
      Descripcion: 'Permite ver el módulo de inventario'
    },
    {
      Nombre_Permiso: 'ver vacaciones',
      Descripcion: 'Permite ver el módulo de vacaciones'
    },
    {
      Nombre_Permiso: 'ver mantenimiento',
      Descripcion: 'Permite ver el módulo de mantenimiento'
    },
    {
      Nombre_Permiso: 'manejar vacaciones',
      Descripcion: 'Permite gestionar solicitudes de vacaciones'
    },
    {
      Nombre_Permiso: 'manejar reservas sala',
      Descripcion: 'Permite gestionar reservas de sala'
    },
    {
      Nombre_Permiso: 'manejar inventario',
      Descripcion: 'Permite gestionar el inventario'
    },
    {
      Nombre_Permiso: 'manejar usuarios',
      Descripcion: 'Permite gestionar usuarios'
    },
    {
      Nombre_Permiso: 'manejar roles',
      Descripcion: 'Permite gestionar roles y permisos'
    }
  ];

  for (const permiso of permisos) {
    await prisma.permisos.create({ data: permiso });
  }

  // Assign Permissions to Roles
  const permisosAdmin = await prisma.permisos.findMany(); // Fetch all permissions

  for (const permiso of permisosAdmin) {
    await prisma.rolePermisos.create({
      data: {
        Cod_Rol: rolAdmin.Cod_Rol,
        Cod_Permiso: permiso.Cod_Permiso
      }
    });
  }

  // Seed Personas
  const persona1 = await prisma.personas.create({
    data: {
      Nombre: 'Juan',
      Apellido: 'Perez',
      Identidad: '123456789',
      Fecha_Nacimiento: new Date('1990-01-01'),
      Edad: 33,
      Genero: 'Masculino',
      Estado_Civil: 'Soltero',
      Direccion: 'Calle Falsa 123',
      Telefono: '123456789',
      Usuario: {
        create: {
          CorreoElectronico: 'juan.perez@example.com',
          Contrasena: hashedPassword,
          Cod_EstadoUsuario: estadoUsuario.Cod_EstadoUsuario,
          Cod_Rol: rolAdmin.Cod_Rol,
          Intentos_Fallidos: '0',
          Fecha_Creacion: new Date(),
          Creado_Por: 'admin',
          Fecha_Modificacion: new Date(),
          Modificado_Por: 'admin'
        }
      },
      Empleado: {
        create: {
          Cod_Departamento: departamento.Cod_Departamento,
          Cod_Cargo: cargo.Cod_Cargo,
          Fecha_Contrato: new Date('2022-06-04'),
          Dias_Vacaciones_Acumulados: 25
        }
      }
    }
  });

  // Seed Inventario
  const inventario = await prisma.inventario.create({
    data: {
      Nombre_Item: 'Micrófono',
      Descripcion: 'Micrófono de alta calidad',
      Cantidad: 5
    }
  });

  const inventario2 = await prisma.inventario.create({
    data: {
      Nombre_Item: 'Cámara',
      Descripcion: 'Cámara de alta calidad',
      Cantidad: 5
    }
  });

  // Seed Salas
  const sala1 = await prisma.salas.create({
    data: {
      Nombre_Sala: 'Sala 1',
      Descripcion: 'Sala de grabación principal'
    }
  });

  const sala2 = await prisma.salas.create({
    data: {
      Nombre_Sala: 'Sala 2',
      Descripcion: 'Sala de grabación secundaria'
    }
  });

  console.log({
    persona1,
    departamento,
    departamentoDos,
    departamentoTres,
    cargo,
    cargoDos,
    cargoTres,
    estadoUsuario,
    estadoUsuario2,
    rolAdmin,
    rolUser,
    inventario,
    inventario2,
    sala1,
    sala2
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
