/*
  Warnings:

  - You are about to drop the column `Cod_Empleado` on the `personas` table. All the data in the column will be lost.
  - You are about to drop the column `Cod_Usuario` on the `personas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `personas` DROP FOREIGN KEY `Personas_Cod_Empleado_fkey`;

-- DropForeignKey
ALTER TABLE `personas` DROP FOREIGN KEY `Personas_Cod_Usuario_fkey`;

-- AlterTable
ALTER TABLE `personas` DROP COLUMN `Cod_Empleado`,
    DROP COLUMN `Cod_Usuario`;

-- AddForeignKey
ALTER TABLE `Empleados` ADD CONSTRAINT `Empleados_Cod_Persona_fkey` FOREIGN KEY (`Cod_Persona`) REFERENCES `Personas`(`Cod_Persona`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuarios` ADD CONSTRAINT `Usuarios_Cod_Persona_fkey` FOREIGN KEY (`Cod_Persona`) REFERENCES `Personas`(`Cod_Persona`) ON DELETE RESTRICT ON UPDATE CASCADE;
