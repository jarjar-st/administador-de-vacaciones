/*
  Warnings:

  - A unique constraint covering the columns `[Cod_Usuario]` on the table `Personas` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Cod_Empleado]` on the table `Personas` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `empleados` DROP FOREIGN KEY `Empleados_Cod_Persona_fkey`;

-- DropForeignKey
ALTER TABLE `usuarios` DROP FOREIGN KEY `Usuarios_Cod_Persona_fkey`;

-- CreateIndex
CREATE UNIQUE INDEX `Personas_Cod_Usuario_key` ON `Personas`(`Cod_Usuario`);

-- CreateIndex
CREATE UNIQUE INDEX `Personas_Cod_Empleado_key` ON `Personas`(`Cod_Empleado`);

-- AddForeignKey
ALTER TABLE `Personas` ADD CONSTRAINT `Personas_Cod_Usuario_fkey` FOREIGN KEY (`Cod_Usuario`) REFERENCES `Usuarios`(`Cod_Usuario`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Personas` ADD CONSTRAINT `Personas_Cod_Empleado_fkey` FOREIGN KEY (`Cod_Empleado`) REFERENCES `Empleados`(`Cod_Empleado`) ON DELETE SET NULL ON UPDATE CASCADE;
