import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class CreateInventarioDto {
  @IsString()
  @IsNotEmpty()
  Nombre_Item: string;

  @IsString()
  @IsNotEmpty()
  Descripcion: string;

  @IsInt()
  @IsNotEmpty()
  Cantidad: number;
}
