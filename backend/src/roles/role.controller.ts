import {
  Controller,
  Post,
  Body,
  Delete,
  Get,
  Param,
  Put,
  UseGuards
} from '@nestjs/common';
import { RoleService } from './role.service';
import { AssignPermissionDto } from './dto/assign-permission.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { Roles } from 'src/auth/roles.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @UseGuards(JwtGuard)
  @Roles('admin')
  @Post()
  createRole(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }

  @UseGuards(JwtGuard)
  @Roles('admin')
  @Put('assign-permission')
  assignPermission(@Body() dto: AssignPermissionDto) {
    return this.roleService.assignPermission(dto);
  }

  // @Delete('remove-permission')
  // removePermission(@Body() dto: AssignPermissionDto) {
  //   return this.roleService.removePermission(dto);
  // }

  @UseGuards(JwtGuard)
  @Roles('admin')
  @Get()
  getAllRoles() {
    return this.roleService.getAllRoles();
  }

  @UseGuards(JwtGuard)
  @Roles('admin')
  @Get('permissions')
  getAllPermisos() {
    return this.roleService.getAllPermisos();
  }

  @UseGuards(JwtGuard)
  @Roles('admin')
  @Get('/:roleId/permissions')
  getPermissionsByRole(@Param('roleId') roleId: string) {
    return this.roleService.getPermissionsByRole(Number(roleId));
  }
}
