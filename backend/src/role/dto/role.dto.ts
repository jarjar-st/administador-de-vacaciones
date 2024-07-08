import { IsEmail, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  role: string;

  @IsString()
  description: string;

  @IsString()
  createdBy: string;
}
