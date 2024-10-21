/*
  Warnings:

  - You are about to alter the column `inKind` on the `barangayrequestpost` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `barangayrequestpost` MODIFY `inKind` JSON NOT NULL;
