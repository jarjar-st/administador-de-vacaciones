-- CreateTable
CREATE TABLE `Roles` (
    `Cod_Rol` INTEGER NOT NULL,
    `Rol` VARCHAR(45) NOT NULL,
    `Descripcion` VARCHAR(45) NOT NULL,
    `Fecha_Creacion` DATETIME(3) NOT NULL,
    `Creado_Por` VARCHAR(45) NOT NULL,
    `Fecha_Modificacion` DATETIME(3) NOT NULL,
    `Modificado_Por` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`Cod_Rol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuarios` (
    `Cod_Usuario` INTEGER NOT NULL,
    `Cod_Persona` INTEGER NOT NULL,
    `Cod_EstadoUsuario` INTEGER NOT NULL,
    `Contraseña` VARCHAR(25) NOT NULL,
    `Cod_Rol` INTEGER NOT NULL,
    `Intentos_Fallidos` VARCHAR(45) NOT NULL,
    `Fecha_Creacion` DATETIME(3) NOT NULL,
    `Creado_Por` VARCHAR(45) NOT NULL,
    `Fecha_Modificacion` DATETIME(3) NOT NULL,
    `Modificado_Por` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`Cod_Usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuarios` ADD CONSTRAINT `Usuarios_Cod_Persona_fkey` FOREIGN KEY (`Cod_Persona`) REFERENCES `Personas`(`Cod_Persona`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuarios` ADD CONSTRAINT `Usuarios_Cod_EstadoUsuario_fkey` FOREIGN KEY (`Cod_EstadoUsuario`) REFERENCES `Estado_Usuario`(`Cod_EstadoUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuarios` ADD CONSTRAINT `Usuarios_Cod_Rol_fkey` FOREIGN KEY (`Cod_Rol`) REFERENCES `Roles`(`Cod_Rol`) ON DELETE RESTRICT ON UPDATE CASCADE;
