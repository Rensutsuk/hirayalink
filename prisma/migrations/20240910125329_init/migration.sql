/*
  Warnings:

  - The primary key for the `admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `adminID` on the `admin` table. All the data in the column will be lost.
  - The primary key for the `donor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `donorID` on the `donor` table. All the data in the column will be lost.
  - Added the required column `id` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Donor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `admin` DROP PRIMARY KEY,
    DROP COLUMN `adminID`,
    ADD COLUMN `id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `donor` DROP PRIMARY KEY,
    DROP COLUMN `donorID`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
