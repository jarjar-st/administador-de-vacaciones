import {
  Controller,
  Post,
  Body,
  Delete,
  Get,
  Param,
  Put
} from '@nestjs/common';
import { RoleService } from './role.service';
import { AssignPermissionDto } from './dto/assign-permission.dto';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  createRole(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }

  @Put('assign-permission')
  assignPermission(@Body() dto: AssignPermissionDto) {
    return this.roleService.assignPermission(dto);
  }

  // @Delete('remove-permission')
  // removePermission(@Body() dto: AssignPermissionDto) {
  //   return this.roleService.removePermission(dto);
  // }

  @Get()
  getAllRoles() {
    return this.roleService.getAllRoles();
  }

  @Get('permissions')
  getAllPermisos() {
    return this.roleService.getAllPermisos();
  }

  @Get('/:roleId/permissions')
  getPermissionsByRole(@Param('roleId') roleId: string) {
    return this.roleService.getPermissionsByRole(Number(roleId));
  }
}
