/*
  Warnings:

  - You are about to drop the column `controlNumber` on the `barangayrequestpost` table. All the data in the column will be lost.
  - You are about to alter the column `inKind` on the `barangayrequestpost` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to drop the column `barangay` on the `recipientrequestpost` table. All the data in the column will be lost.
  - You are about to alter the column `inKindNecessities` on the `recipientrequestpost` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - Added the required column `area` to the `Barangay` table without a default value. This is not possible if the table is not empty.
  - Added the required column `area` to the `BarangayRequestPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `area` to the `RecipientRequestPost` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `BarangayRequestPost_controlNumber_key` ON `barangayrequestpost`;

-- AlterTable
ALTER TABLE `barangay` ADD COLUMN `area` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `barangayrequestpost` DROP COLUMN `controlNumber`,
    ADD COLUMN `area` VARCHAR(191) NOT NULL,
    ADD COLUMN `barangayId` VARCHAR(191) NULL,
    MODIFY `inKind` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `recipientrequestpost` DROP COLUMN `barangay`,
    ADD COLUMN `area` VARCHAR(191) NOT NULL,
    ADD COLUMN `barangayId` VARCHAR(191) NULL,
    MODIFY `inKindNecessities` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `BarangayRequestPost` ADD CONSTRAINT `BarangayRequestPost_barangayId_fkey` FOREIGN KEY (`barangayId`) REFERENCES `Barangay`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipientRequestPost` ADD CONSTRAINT `RecipientRequestPost_barangayId_fkey` FOREIGN KEY (`barangayId`) REFERENCES `Barangay`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
