import { IsInt, IsNotEmpty, IsDate, IsOptional } from 'class-validator';

export class CreateVacaDto {
  @IsInt()
  @IsNotEmpty()
  Cod_Empleado: number;

  //   @IsDate()
  @IsNotEmpty()
  Fecha_Inicio: Date;

  //   @IsDate()
  @IsNotEmpty()
  Fecha_Fin: Date;

  @IsOptional()
  Estado_Solicitud?: string;
}
