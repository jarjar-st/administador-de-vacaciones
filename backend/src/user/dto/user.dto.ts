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
  telefono: string;
}

// DTO para los correos electrónicos
class CorreoElectronicoDto {
  @IsEmail()
  correo: string;
}

// DTO para los datos del usuario
class UsuarioDto {
  @IsString()
  @IsOptional()
  contrasena?: string;

  @IsInt()
  codRol: number;

  @IsInt()
  codEstadoUsuario: number;

  @IsInt()
  @IsOptional()
  intentosFallidos?: number;

  @IsString()
  creadoPor: string;

  @IsOptional()
  @IsString()
  modificadoPor?: string;
}

// DTO para los datos del empleado
class EmpleadoDto {
  @IsInt()
  codDepartamento: number;

  @IsInt()
  codCargo: number;

  @IsString()
  fechaContrato: string;
}

// DTO principal para la creación de usuarios
export class CreateUsuarioDto {
  // Datos de la Persona
  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsNumberString()
  identidad: string;

  @IsString()
  fechaNacimiento: string;

  @IsString()
  genero: string;

  @IsString()
  estadoCivil: string;

  @IsString()
  direccion: string;

  @ValidateNested({ each: true })
  @Type(() => TelefonoDto)
  @IsArray()
  telefonos: TelefonoDto[];

  @ValidateNested({ each: true })
  @Type(() => CorreoElectronicoDto)
  @IsArray()
  correosElectronicos: CorreoElectronicoDto[];

  // Datos de la Cuenta de Usuario
  @ValidateNested()
  @Type(() => UsuarioDto)
  usuario: UsuarioDto;

  // Datos del Empleado
  @ValidateNested()
  @Type(() => EmpleadoDto)
  empleado: EmpleadoDto;
}
