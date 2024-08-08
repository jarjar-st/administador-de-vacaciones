import { IsOptional, IsInt, IsString } from 'class-validator';

export class UpdateInventarioDto {
  @IsString()
  @IsOptional()
  Nombre_Item?: string;

  @IsString()
  @IsOptional()
  Descripcion?: string;

  @IsInt()
  @IsOptional()
  Cantidad?: number;
}
