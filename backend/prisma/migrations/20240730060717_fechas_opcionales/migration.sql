-- AlterTable
ALTER TABLE `roles` MODIFY `Fecha_Creacion` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `Fecha_Modificacion` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `usuarios` MODIFY `Fecha_Creacion` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `Fecha_Modificacion` DATETIME(3) NULL;
