import { IsString, IsInt, IsDate, IsOptional } from 'class-validator';

export class UpdateReservaDto {
  @IsInt()
  Cod_Usuario?: number;

  @IsInt()
  Cod_Sala?: number;

  @IsDate()
  Fecha_Reserva?: Date;

  @IsDate()
  Hora_Inicio?: Date;

  @IsDate()
  Hora_Fin?: Date;

  @IsString()
  @IsOptional()
  Estado_Reserva?: string;
}
