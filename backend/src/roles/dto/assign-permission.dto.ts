import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsNumber,
  ArrayNotEmpty
} from 'class-validator';

export class AssignPermissionDto {
  @IsNumber()
  @IsNotEmpty()
  Cod_Rol: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  Cod_Permisos: number[];
}
