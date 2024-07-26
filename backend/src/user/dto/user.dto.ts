import {
  IsEmail,
  IsString,
  IsInt,
  IsDate,
  IsOptional,
  IsArray,
  ValidateNested,
  IsNumberString
} from 'class-validator';
import { Type } from 'class-transformer';

// DTO para los teléfonos
class TelefonoDto {
  @IsNumberString()
  Telefono: string;
}

// DTO para los correos electrónicos
class CorreoElectronicoDto {
  @IsEmail()
  Correo: string;
}

// DTO para los datos del usuario
class UsuarioDto {
  @IsString()
  @IsOptional()
  Contrasena?: string;

  @IsInt()
  Cod_Rol: number;

  @IsInt()
  Cod_EstadoUsuario: number;

  @IsInt()
  @IsOptional()
  Intentos_Fallidos?: number;

  @IsString()
  Creado_Por: string;

  @IsOptional()
  @IsString()
  Modificado_Por?: string;
}

// DTO para los datos del empleado
class EmpleadoDto {
  @IsInt()
  Cod_Departamento: number;

  @IsInt()
  Cod_Cargo: number;

  @IsString()
  Fecha_Contrato: string;
}

// DTO principal para la creación de usuarios
export class CreateUsuarioDto {
  // Datos de la Persona
  @IsString()
  Nombre: string;

  @IsString()
  Apellido: string;

  @IsNumberString()
  Identidad: string;

  @IsString()
  Fecha_Nacimiento: string;

  @IsString()
  Genero: string;

  @IsString()
  Estado_Civil: string;

  @IsString()
  Direccion: string;

  @ValidateNested({ each: true })
  @Type(() => TelefonoDto)
  @IsArray()
  Telefonos: TelefonoDto[];

  @ValidateNested({ each: true })
  @Type(() => CorreoElectronicoDto)
  @IsArray()
  CorreoElectronico: CorreoElectronicoDto[];

  // Datos de la Cuenta de Usuario
  @ValidateNested()
  @Type(() => UsuarioDto)
  Usuarios: UsuarioDto;

  // Datos del Empleado
  @ValidateNested()
  @Type(() => EmpleadoDto)
  Empleados: EmpleadoDto;
}
