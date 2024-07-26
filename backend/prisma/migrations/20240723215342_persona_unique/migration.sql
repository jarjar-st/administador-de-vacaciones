/*
  Warnings:

  - A unique constraint covering the columns `[Cod_Persona]` on the table `Correo_Electronico` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Cod_Persona]` on the table `Empleados` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Cod_Persona]` on the table `Telefonos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Cod_Persona]` on the table `Usuarios` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Correo_Electronico_Cod_Persona_key` ON `Correo_Electronico`(`Cod_Persona`);

-- CreateIndex
CREATE UNIQUE INDEX `Empleados_Cod_Persona_key` ON `Empleados`(`Cod_Persona`);

-- CreateIndex
CREATE UNIQUE INDEX `Telefonos_Cod_Persona_key` ON `Telefonos`(`Cod_Persona`);

-- CreateIndex
CREATE UNIQUE INDEX `Usuarios_Cod_Persona_key` ON `Usuarios`(`Cod_Persona`);
