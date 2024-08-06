// create-reserva.dto.ts
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsArray,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

class InventarioDto {
  @IsInt()
  @IsNotEmpty()
  Cod_Inventario: number;

  @IsInt()
  @IsNotEmpty()
  CantidadSolicitada: number;
}

export class CreateReservaDto {
  @IsInt()
  @IsNotEmpty()
  Cod_Usuario: number;

  @IsInt()
  @IsNotEmpty()
  Cod_Sala: number;

  @IsNotEmpty()
  Fecha_Reserva: Date;

  @IsNotEmpty()
  Hora_Inicio: Date;

  @IsNotEmpty()
  Hora_Fin: Date;

  @IsOptional()
  Estado_Reserva?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InventarioDto)
  Inventario?: InventarioDto[];
}
