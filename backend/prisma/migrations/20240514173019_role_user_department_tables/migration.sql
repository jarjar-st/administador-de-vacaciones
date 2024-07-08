/*
  Warnings:

  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[identityNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthDate` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contractStartDate` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departmentId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identityNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maritalStatus` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modificationDate` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `name`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `birthDate` DATETIME(3) NOT NULL,
    ADD COLUMN `contractStartDate` DATETIME(3) NOT NULL,
    ADD COLUMN `createdBy` VARCHAR(191) NOT NULL,
    ADD COLUMN `creationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `departmentId` INTEGER NOT NULL,
    ADD COLUMN `failedAttempts` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `identityNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL,
    ADD COLUMN `maritalStatus` VARCHAR(191) NOT NULL,
    ADD COLUMN `modificationDate` DATETIME(3) NOT NULL,
    ADD COLUMN `modifiedBy` VARCHAR(191) NULL,
    ADD COLUMN `phone` INTEGER NOT NULL,
    ADD COLUMN `roleId` INTEGER NOT NULL,
    ADD COLUMN `userStateId` VARCHAR(191) NOT NULL DEFAULT 'Inactivo';

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdBy` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `updatedBy` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Department` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `department` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_identityNumber_key` ON `User`(`identityNumber`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
