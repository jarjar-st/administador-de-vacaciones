/*
  Warnings:

  - You are about to drop the `_inventariotoreservasgrabacion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_inventariotoreservasgrabacion` DROP FOREIGN KEY `_InventarioToReservasGrabacion_A_fkey`;

-- DropForeignKey
ALTER TABLE `_inventariotoreservasgrabacion` DROP FOREIGN KEY `_InventarioToReservasGrabacion_B_fkey`;

-- DropTable
DROP TABLE `_inventariotoreservasgrabacion`;

-- CreateTable
CREATE TABLE `ReservasInventario` (
    `Cod_Reserva` INTEGER NOT NULL,
    `Cod_Inventario` INTEGER NOT NULL,
    `CantidadSolicitada` INTEGER NOT NULL,

    PRIMARY KEY (`Cod_Reserva`, `Cod_Inventario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ReservasInventario` ADD CONSTRAINT `ReservasInventario_Cod_Reserva_fkey` FOREIGN KEY (`Cod_Reserva`) REFERENCES `ReservasGrabacion`(`Cod_Reserva`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReservasInventario` ADD CONSTRAINT `ReservasInventario_Cod_Inventario_fkey` FOREIGN KEY (`Cod_Inventario`) REFERENCES `Inventario`(`Cod_Inventario`) ON DELETE RESTRICT ON UPDATE CASCADE;
