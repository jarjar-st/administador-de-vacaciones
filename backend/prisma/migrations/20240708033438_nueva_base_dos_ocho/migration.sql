-- DropIndex
DROP INDEX `Correo_Electronico_Cod_Persona_fkey` ON `correo_electronico`;

-- DropIndex
DROP INDEX `Empleados_Cod_Cargo_fkey` ON `empleados`;

-- DropIndex
DROP INDEX `Empleados_Cod_Departamento_fkey` ON `empleados`;

-- DropIndex
DROP INDEX `Empleados_Cod_Persona_fkey` ON `empleados`;

-- DropIndex
DROP INDEX `Telefonos_Cod_Persona_fkey` ON `telefonos`;

-- DropIndex
DROP INDEX `Usuarios_Cod_EstadoUsuario_fkey` ON `usuarios`;

-- DropIndex
DROP INDEX `Usuarios_Cod_Persona_fkey` ON `usuarios`;

-- DropIndex
DROP INDEX `Usuarios_Cod_Rol_fkey` ON `usuarios`;

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

-- AddForeignKey
ALTER TABLE `Usuarios` ADD CONSTRAINT `Usuarios_Cod_Persona_fkey` FOREIGN KEY (`Cod_Persona`) REFERENCES `Personas`(`Cod_Persona`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuarios` ADD CONSTRAINT `Usuarios_Cod_EstadoUsuario_fkey` FOREIGN KEY (`Cod_EstadoUsuario`) REFERENCES `Estado_Usuario`(`Cod_EstadoUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuarios` ADD CONSTRAINT `Usuarios_Cod_Rol_fkey` FOREIGN KEY (`Cod_Rol`) REFERENCES `Roles`(`Cod_Rol`) ON DELETE RESTRICT ON UPDATE CASCADE;
