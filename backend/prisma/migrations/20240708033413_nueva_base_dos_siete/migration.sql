/*
  Warnings:

  - You are about to alter the column `Nombre` on the `personas` table. The data in that column could be lost. The data in that column will be cast from `VarChar(25)` to `Int`.
  - A unique constraint covering the columns `[Correo]` on the table `Correo_Electronico` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `correo_electronico` DROP FOREIGN KEY `Correo_Electronico_Cod_Persona_fkey`;

-- DropForeignKey
ALTER TABLE `empleados` DROP FOREIGN KEY `Empleados_Cod_Cargo_fkey`;

-- DropForeignKey
ALTER TABLE `empleados` DROP FOREIGN KEY `Empleados_Cod_Departamento_fkey`;

-- DropForeignKey
ALTER TABLE `empleados` DROP FOREIGN KEY `Empleados_Cod_Persona_fkey`;

-- DropForeignKey
ALTER TABLE `telefonos` DROP FOREIGN KEY `Telefonos_Cod_Persona_fkey`;

-- DropForeignKey
ALTER TABLE `usuarios` DROP FOREIGN KEY `Usuarios_Cod_EstadoUsuario_fkey`;

-- DropForeignKey
ALTER TABLE `usuarios` DROP FOREIGN KEY `Usuarios_Cod_Persona_fkey`;

-- DropForeignKey
ALTER TABLE `usuarios` DROP FOREIGN KEY `Usuarios_Cod_Rol_fkey`;

-- AlterTable
ALTER TABLE `cargo` MODIFY `Cod_Cargo` INTEGER NOT NULL AUTO_INCREMENT;

-- AlterTable
ALTER TABLE `correo_electronico` MODIFY `Cod_Correo` INTEGER NOT NULL AUTO_INCREMENT;

-- AlterTable
ALTER TABLE `departamento` MODIFY `Cod_Departamento` INTEGER NOT NULL AUTO_INCREMENT;

-- AlterTable
ALTER TABLE `empleados` MODIFY `Cod_Empleado` INTEGER NOT NULL AUTO_INCREMENT;

-- AlterTable
ALTER TABLE `estado_usuario` MODIFY `Cod_EstadoUsuario` INTEGER NOT NULL AUTO_INCREMENT;

-- AlterTable
ALTER TABLE `personas` MODIFY `Cod_Persona` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `Nombre` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `roles` MODIFY `Cod_Rol` INTEGER NOT NULL AUTO_INCREMENT;

-- AlterTable
ALTER TABLE `telefonos` MODIFY `Cod_Telefono` INTEGER NOT NULL AUTO_INCREMENT;

-- AlterTable
ALTER TABLE `usuarios` MODIFY `Cod_Usuario` INTEGER NOT NULL AUTO_INCREMENT;

-- CreateIndex
CREATE UNIQUE INDEX `Correo_Electronico_Correo_key` ON `Correo_Electronico`(`Correo`);
