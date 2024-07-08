/*
  Warnings:

  - You are about to drop the `department` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_departmentId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_roleId_fkey`;

-- DropTable
DROP TABLE `department`;

-- DropTable
DROP TABLE `role`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `Personas` (
    `Cod_Persona` INTEGER NOT NULL,
    `Nombre` VARCHAR(25) NOT NULL,
    `Apellido` VARCHAR(25) NOT NULL,
    `Identidad` VARCHAR(15) NOT NULL,
    `Fecha_Nacimiento` DATETIME(3) NULL,
    `Edad` INTEGER NULL,
    `Genero` VARCHAR(25) NOT NULL,
    `Estado_Civil` VARCHAR(25) NOT NULL,
    `Direccion` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`Cod_Persona`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Telefonos` (
    `Cod_Telefono` INTEGER NOT NULL,
    `Telefono` INTEGER NOT NULL,
    `Cod_Persona` INTEGER NOT NULL,

    PRIMARY KEY (`Cod_Telefono`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Correo_Electronico` (
    `Cod_Correo` INTEGER NOT NULL,
    `Correo` VARCHAR(45) NOT NULL,
    `Cod_Persona` INTEGER NOT NULL,

    PRIMARY KEY (`Cod_Correo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Departamento` (
    `Cod_Departamento` INTEGER NOT NULL,
    `Departamento` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`Cod_Departamento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cargo` (
    `Cod_Cargo` INTEGER NOT NULL,
    `Cargo` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`Cod_Cargo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Empleados` (
    `Cod_Empleado` INTEGER NOT NULL,
    `Cod_Persona` INTEGER NOT NULL,
    `Cod_Departamento` INTEGER NOT NULL,
    `Cod_Cargo` INTEGER NOT NULL,
    `Fecha_Contrato` DATETIME(3) NOT NULL,

    PRIMARY KEY (`Cod_Empleado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Estado_Usuario` (
    `Cod_EstadoUsuario` INTEGER NOT NULL,
    `Descripcion` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`Cod_EstadoUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Telefonos` ADD CONSTRAINT `Telefonos_Cod_Persona_fkey` FOREIGN KEY (`Cod_Persona`) REFERENCES `Personas`(`Cod_Persona`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Correo_Electronico` ADD CONSTRAINT `Correo_Electronico_Cod_Persona_fkey` FOREIGN KEY (`Cod_Persona`) REFERENCES `Personas`(`Cod_Persona`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Empleados` ADD CONSTRAINT `Empleados_Cod_Persona_fkey` FOREIGN KEY (`Cod_Persona`) REFERENCES `Personas`(`Cod_Persona`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Empleados` ADD CONSTRAINT `Empleados_Cod_Departamento_fkey` FOREIGN KEY (`Cod_Departamento`) REFERENCES `Departamento`(`Cod_Departamento`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Empleados` ADD CONSTRAINT `Empleados_Cod_Cargo_fkey` FOREIGN KEY (`Cod_Cargo`) REFERENCES `Cargo`(`Cod_Cargo`) ON DELETE RESTRICT ON UPDATE CASCADE;
