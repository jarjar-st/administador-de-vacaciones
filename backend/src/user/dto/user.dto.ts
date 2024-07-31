import {
  IsEmail,
  IsString,
  IsInt,
  IsDate,
  IsOptional,
  IsArray,
  ValidateNested,
  IsNumberString,
  isString
} from 'class-validator';
import { Type } from 'class-transformer';

// DTO para los datos del usuario
// class UsuarioDto {
//   @IsString()
//   CorreoElectronico: string;

//   @IsString()
//   @IsOptional()
//   Contrasena?: string;

//   @IsInt()
//   Cod_Rol: number;

//   @IsInt()
//   Cod_EstadoUsuario: number;

//   @IsInt()
//   @IsOptional()
//   Intentos_Fallidos?: number;

//   @IsString()
//   @IsOptional()
//   Fecha_Modificacion: string;

//   @IsString()
//   @IsOptional()
//   Creado_Por: string;

//   @IsString()
//   @IsOptional()
//   Fecha_Creacion: string;

//   @IsOptional()
//   @IsString()
//   Modificado_Por?: string;
// }

// DTO para los datos del empleado
// class EmpleadoDto {
//   @IsInt()
//   Cod_Departamento: number;

//   @IsInt()
//   Cod_Cargo: number;

//   @IsString()
//   Fecha_Contrato: string;
// }

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

  @IsString()
  Telefono: string;

  // Campo adicional Edad
  @IsInt()
  @IsOptional()
  Edad?: number;

  @IsInt()
  Cod_Departamento: number;

  @IsInt()
  Cod_Cargo: number;

  @IsString()
  Fecha_Contrato: string;

  @IsString()
  CorreoElectronico: string;

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
  @IsOptional()
  Fecha_Modificacion: string;

  @IsString()
  @IsOptional()
  Creado_Por: string;

  @IsString()
  @IsOptional()
  Fecha_Creacion: string;

  @IsOptional()
  @IsString()
  Modificado_Por?: string;

  // Datos de la Cuenta de Usuario
  // @ValidateNested()
  // @Type(() => UsuarioDto)
  // Usuario: UsuarioDto;

  // Datos del Empleado
  // @ValidateNested()
  // @Type(() => EmpleadoDto)
  // Empleado: EmpleadoDto;
}
