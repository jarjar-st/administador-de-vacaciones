/*
  Warnings:

  - A unique constraint covering the columns `[Cargo]` on the table `Cargo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Departamento]` on the table `Departamento` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Rol]` on the table `Roles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Cargo_Cargo_key` ON `Cargo`(`Cargo`);

-- CreateIndex
CREATE UNIQUE INDEX `Departamento_Departamento_key` ON `Departamento`(`Departamento`);

-- CreateIndex
CREATE UNIQUE INDEX `Roles_Rol_key` ON `Roles`(`Rol`);
