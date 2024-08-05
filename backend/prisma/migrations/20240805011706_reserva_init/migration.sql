/*
  Warnings:

  - A unique constraint covering the columns `[Telefono]` on the table `Personas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `Inventario` (
    `Cod_Inventario` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre_Item` VARCHAR(45) NOT NULL,
    `Cantidad` INTEGER NOT NULL,

    PRIMARY KEY (`Cod_Inventario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReservasGrabacion` (
    `Cod_Reserva` INTEGER NOT NULL AUTO_INCREMENT,
    `Cod_Usuario` INTEGER NOT NULL,
    `Cod_Sala` INTEGER NOT NULL,
    `Fecha_Reserva` DATETIME(3) NOT NULL,
    `Hora_Inicio` DATETIME(3) NOT NULL,
    `Hora_Fin` DATETIME(3) NOT NULL,
    `Estado_Reserva` VARCHAR(191) NOT NULL DEFAULT 'Pendiente',

    PRIMARY KEY (`Cod_Reserva`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Salas` (
    `Cod_Sala` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre_Sala` VARCHAR(45) NOT NULL,
    `Descripcion` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Salas_Nombre_Sala_key`(`Nombre_Sala`),
    PRIMARY KEY (`Cod_Sala`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_InventarioToReservasGrabacion` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_InventarioToReservasGrabacion_AB_unique`(`A`, `B`),
    INDEX `_InventarioToReservasGrabacion_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Personas_Telefono_key` ON `Personas`(`Telefono`);

-- AddForeignKey
ALTER TABLE `ReservasGrabacion` ADD CONSTRAINT `ReservasGrabacion_Cod_Usuario_fkey` FOREIGN KEY (`Cod_Usuario`) REFERENCES `Usuarios`(`Cod_Usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReservasGrabacion` ADD CONSTRAINT `ReservasGrabacion_Cod_Sala_fkey` FOREIGN KEY (`Cod_Sala`) REFERENCES `Salas`(`Cod_Sala`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_InventarioToReservasGrabacion` ADD CONSTRAINT `_InventarioToReservasGrabacion_A_fkey` FOREIGN KEY (`A`) REFERENCES `Inventario`(`Cod_Inventario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_InventarioToReservasGrabacion` ADD CONSTRAINT `_InventarioToReservasGrabacion_B_fkey` FOREIGN KEY (`B`) REFERENCES `ReservasGrabacion`(`Cod_Reserva`) ON DELETE CASCADE ON UPDATE CASCADE;
