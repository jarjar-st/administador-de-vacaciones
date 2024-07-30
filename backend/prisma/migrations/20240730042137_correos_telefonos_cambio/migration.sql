/*
  Warnings:

  - You are about to drop the `correo_electronico` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `telefonos` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[CorreoElectronico]` on the table `Usuarios` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `correo_electronico` DROP FOREIGN KEY `Correo_Electronico_Cod_Persona_fkey`;

-- DropForeignKey
ALTER TABLE `telefonos` DROP FOREIGN KEY `Telefonos_Cod_Persona_fkey`;

-- AlterTable
ALTER TABLE `personas` ADD COLUMN `Telefono` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `roles` MODIFY `Fecha_Creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `CorreoElectronico` VARCHAR(191) NULL,
    MODIFY `Fecha_Creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `correo_electronico`;

-- DropTable
DROP TABLE `telefonos`;

-- CreateIndex
CREATE UNIQUE INDEX `Usuarios_CorreoElectronico_key` ON `Usuarios`(`CorreoElectronico`);
