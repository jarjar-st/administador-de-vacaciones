import { Controller, Get, Post, Body, Param, Patch, Put } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.updateRole(id, updateRoleDto);
  }

  @Put(':id/permissions')
  assignPermissions(
    @Param('id') id: string,
    @Body('permissionIds') permissionIds: string[]
  ) {
    return this.roleService.assignPermissions(id, permissionIds);
  }

  @Put(':id/remove-permissions')
  removePermissions(
    @Param('id') id: string,
    @Body('permissionIds') permissionIds: string[]
  ) {
    return this.roleService.removePermissions(id, permissionIds);
  }
}
