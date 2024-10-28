/*
  Warnings:

  - Added the required column `batchNumber` to the `BarangayRequestPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `barangayrequestpost` ADD COLUMN `batchNumber` INTEGER NOT NULL;
