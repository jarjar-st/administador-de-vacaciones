-- CreateTable
CREATE TABLE `Accesses` (
    `Cod_Access` INTEGER NOT NULL AUTO_INCREMENT,
    `Cod_Rol` INTEGER NOT NULL,
    `Cod_Object` INTEGER NOT NULL,
    `Ind_Module` BOOLEAN NOT NULL DEFAULT false,
    `Ind_Insert` BOOLEAN NOT NULL DEFAULT false,
    `Ind_Select` BOOLEAN NOT NULL DEFAULT false,
    `Ind_Update` BOOLEAN NOT NULL DEFAULT false,
    `Ind_Delete` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`Cod_Access`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Objects` (
    `Cod_Object` INTEGER NOT NULL AUTO_INCREMENT,
    `Nom_Object` VARCHAR(255) NOT NULL,
    `Tip_Object` VARCHAR(255) NOT NULL,
    `Des_Object` VARCHAR(255) NOT NULL,
    `Ind_Object` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`Cod_Object`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Accesses` ADD CONSTRAINT `Accesses_Cod_Rol_fkey` FOREIGN KEY (`Cod_Rol`) REFERENCES `Roles`(`Cod_Rol`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Accesses` ADD CONSTRAINT `Accesses_Cod_Object_fkey` FOREIGN KEY (`Cod_Object`) REFERENCES `Objects`(`Cod_Object`) ON DELETE RESTRICT ON UPDATE CASCADE;
