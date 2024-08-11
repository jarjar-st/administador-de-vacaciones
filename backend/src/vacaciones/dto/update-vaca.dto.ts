import { IsDate, IsInt, IsOptional } from 'class-validator';

export class UpdateVacaDto {
  @IsInt()
  @IsOptional()
  Cod_Empleado?: number;

  @IsDate()
  @IsOptional()
  Fecha_Inicio?: Date;

  @IsDate()
  @IsOptional()
  Fecha_Fin?: Date;

  @IsOptional()
  Estado_Solicitud?: string;
}
