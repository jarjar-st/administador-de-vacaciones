-- CreateTable
CREATE TABLE `Permisos` (
    `Cod_Permiso` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre_Permiso` VARCHAR(45) NOT NULL,
    `Descripcion` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `Permisos_Nombre_Permiso_key`(`Nombre_Permiso`),
    PRIMARY KEY (`Cod_Permiso`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RolePermisos` (
    `Cod_Rol` INTEGER NOT NULL,
    `Cod_Permiso` INTEGER NOT NULL,

    PRIMARY KEY (`Cod_Rol`, `Cod_Permiso`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RolePermisos` ADD CONSTRAINT `RolePermisos_Cod_Rol_fkey` FOREIGN KEY (`Cod_Rol`) REFERENCES `Roles`(`Cod_Rol`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolePermisos` ADD CONSTRAINT `RolePermisos_Cod_Permiso_fkey` FOREIGN KEY (`Cod_Permiso`) REFERENCES `Permisos`(`Cod_Permiso`) ON DELETE RESTRICT ON UPDATE CASCADE;
