-- CreateTable
CREATE TABLE `Vacaciones` (
    `Cod_Vacacion` INTEGER NOT NULL AUTO_INCREMENT,
    `Cod_Empleado` INTEGER NOT NULL,
    `Fecha_Solicitud` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Fecha_Inicio` DATETIME(3) NOT NULL,
    `Fecha_Fin` DATETIME(3) NOT NULL,
    `Dias_Solicitados` INTEGER NOT NULL,
    `Estado_Solicitud` VARCHAR(191) NOT NULL DEFAULT 'Pendiente',

    INDEX `Vacaciones_Cod_Empleado_idx`(`Cod_Empleado`),
    PRIMARY KEY (`Cod_Vacacion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VacacionesDisponibles` (
    `Cod_VacacionDisponibles` INTEGER NOT NULL AUTO_INCREMENT,
    `Cod_Empleado` INTEGER NOT NULL,
    `Anio` INTEGER NOT NULL,
    `Dias_Disponibles` INTEGER NOT NULL,
    `Dias_Utilizados` INTEGER NOT NULL,

    UNIQUE INDEX `VacacionesDisponibles_Cod_Empleado_Anio_key`(`Cod_Empleado`, `Anio`),
    PRIMARY KEY (`Cod_VacacionDisponibles`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Vacaciones` ADD CONSTRAINT `Vacaciones_Cod_Empleado_fkey` FOREIGN KEY (`Cod_Empleado`) REFERENCES `Empleados`(`Cod_Empleado`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VacacionesDisponibles` ADD CONSTRAINT `VacacionesDisponibles_Cod_Empleado_fkey` FOREIGN KEY (`Cod_Empleado`) REFERENCES `Empleados`(`Cod_Empleado`) ON DELETE RESTRICT ON UPDATE CASCADE;
