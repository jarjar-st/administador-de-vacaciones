// prisma/seed.ts
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
      Departamento: 'Operaciones Tecnicas'
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
      Cargo: 'Tecnico'
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
  const rol = await prisma.roles.create({
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
      Descripcion: 'user role',
      Fecha_Creacion: new Date(),
      Creado_Por: 'system',
      Fecha_Modificacion: new Date(),
      Modificado_Por: 'system'
    }
  });

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
          Cod_EstadoUsuario: 1,
          Cod_Rol: 1,
          Intentos_Fallidos: '0',
          Fecha_Creacion: new Date(),
          Creado_Por: 'admin',
          Fecha_Modificacion: new Date(),
          Modificado_Por: 'admin'
        }
      },
      Empleado: {
        create: {
          Cod_Departamento: 1,
          Cod_Cargo: 1,
          Fecha_Contrato: new Date('2022-06-04')
        }
      }
    }
  });

  //Seed Inventario

  const inventario = await prisma.inventario.create({
    data: {
      Nombre_Item: 'Microfono',
      Descripcion: 'Microfono de alta calidad',
      Cantidad: 5
    }
  });

  const inventario2 = await prisma.inventario.create({
    data: {
      Nombre_Item: 'Camara',
      Descripcion: 'Camara de alta calidad',
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
    rol,
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
