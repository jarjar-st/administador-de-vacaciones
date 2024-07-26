// update-user.dto.ts
import { IsString, IsInt, IsDate, IsOptional, IsArray } from 'class-validator';

export class UpdateUsuarioDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  apellido?: string;

  @IsString()
  @IsOptional()
  identidad?: string;

  @IsString()
  @IsOptional()
  fechaNacimiento?: string;

  @IsString()
  @IsOptional()
  genero?: string;

  @IsString()
  @IsOptional()
  estadoCivil?: string;

  @IsString()
  @IsOptional()
  direccion?: string;

  @IsArray()
  @IsOptional()
  telefonos?: { telefono: string }[];

  @IsArray()
  @IsOptional()
  correosElectronicos?: { correo: string }[];

  @IsOptional()
  empleado?: {
    codDepartamento?: number;
    codCargo?: number;
    fechaContrato?: string;
  };

  @IsOptional()
  usuario?: {
    contrasena?: string;
    codEstadoUsuario?: number;
    codRol?: number;
    intentosFallidos?: number;
    creadoPor?: string;
    modificadoPor?: string;
  };
}
