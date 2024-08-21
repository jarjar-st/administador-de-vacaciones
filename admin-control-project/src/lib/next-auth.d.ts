import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      Cod_Usuario: number;
      Cod_Persona: number;
      Cod_EstadoUsuario: number;
      Cod_Rol: number;
      Intentos_Fallidos: string;
      Fecha_Creacion: string;
      Creado_Por: string;
      Fecha_Modificacion: string;
      Modificado_Por: string;
      Persona: {
        Cod_Persona: number;
        Nombre: string;
        Apellido: string;
        Identidad: string;
        Fecha_Nacimiento: string;
        Edad: number | null;
        Genero: string;
        Estado_Civil: string;
        Direccion: string;
        Empleado: {
          Cod_Empleado: number;
          Cod_Persona: number;
          Cod_Departamento: number;
          Cod_Cargo: number;
          Fecha_Contrato: string;
          Dias_Vacaciones_Acumulados: number;
        };
      };
      Rol: {
        Cod_Rol: number;
        Rol: string;
        Descripcion: string;
        Fecha_Creacion: string;
        Creado_Por: string;
        Fecha_Modificacion: string;
        Modificado_Por: string;
        RolePermisos: RolePermiso[];
      };
      EstadoUsuario: {
        Cod_EstadoUsuario: number;
        Descripcion: string;
      };

    };

    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      Cod_Usuario: number;
      Cod_Persona: number;
      Cod_EstadoUsuario: number;
      Cod_Rol: number;
      Intentos_Fallidos: string;
      Fecha_Creacion: string;
      Creado_Por: string;
      Fecha_Modificacion: string;
      Modificado_Por: string;
      Persona: {
        Cod_Persona: number;
        Nombre: string;
        Apellido: string;
        Identidad: string;
        Fecha_Nacimiento: string;
        Edad: number | null;
        Genero: string;
        Estado_Civil: string;
        Direccion: string;
        Empleado: {
          Cod_Empleado: number;
          Cod_Persona: number;
          Cod_Departamento: number;
          Cod_Cargo: number;
          Fecha_Contrato: string;
          Dias_Vacaciones_Acumulados: number;
        };
      };
      Rol: {
        Cod_Rol: number;
        Rol: string;
        Descripcion: string;
        Fecha_Creacion: string;
        Creado_Por: string;
        Fecha_Modificacion: string;
        Modificado_Por: string;
        RolePermisos: RolePermiso[];
      };
      EstadoUsuario: {
        Cod_EstadoUsuario: number;
        Descripcion: string;
      };
      backendTokens: {
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
      };
    }
  }
}