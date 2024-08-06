import { IsString, IsInt, IsDate, IsOptional } from 'class-validator';

export class UpdateReservaDto {
  @IsInt()
  @IsOptional()
  Cod_Usuario?: number;

  @IsInt()
  @IsOptional()
  Cod_Sala?: number;

  @IsDate()
  @IsOptional()
  Fecha_Reserva?: Date;

  @IsDate()
  @IsOptional()
  Hora_Inicio?: Date;

  @IsDate()
  @IsOptional()
  Hora_Fin?: Date;

  @IsString()
  @IsOptional()
  Estado_Reserva?: string;
}
