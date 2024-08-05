/*
  Warnings:

  - Added the required column `Descripcion` to the `Inventario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `inventario` ADD COLUMN `Descripcion` VARCHAR(255) NOT NULL;
