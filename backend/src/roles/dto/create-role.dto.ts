import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  Rol: string;
  @IsString()
  @IsNotEmpty()
  Descripcion: string;
  @IsString()
  @IsNotEmpty()
  Creado_Por: string;
  @IsString()
  @IsNotEmpty()
  Modificado_Por: string;
}
