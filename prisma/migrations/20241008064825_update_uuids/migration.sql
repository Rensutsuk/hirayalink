/*
  Warnings:

  - The primary key for the `admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `barangay` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `barangayrequestpost` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `batch` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `comment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `postId` on the `comment` table. All the data in the column will be lost.
  - The primary key for the `donation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `donationitem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `donationstatuslog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `donor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `like` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `postId` on the `like` table. All the data in the column will be lost.
  - The primary key for the `recipientrequestpost` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `successstory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId,barangayRequestPostId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,recipientRequestPostId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `barangayId` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_id_fkey`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_postId_fkey`;

-- DropForeignKey
ALTER TABLE `donation` DROP FOREIGN KEY `Donation_barangayId_fkey`;

-- DropForeignKey
ALTER TABLE `donation` DROP FOREIGN KEY `Donation_donorId_fkey`;

-- DropForeignKey
ALTER TABLE `donationitem` DROP FOREIGN KEY `DonationItem_donationId_fkey`;

-- DropForeignKey
ALTER TABLE `donationstatuslog` DROP FOREIGN KEY `DonationStatusLog_donationId_fkey`;

-- DropForeignKey
ALTER TABLE `like` DROP FOREIGN KEY `Like_id_fkey`;

-- DropForeignKey
ALTER TABLE `like` DROP FOREIGN KEY `Like_postId_fkey`;

-- DropIndex
DROP INDEX `Like_userId_postId_key` ON `like`;

-- AlterTable
ALTER TABLE `admin` DROP PRIMARY KEY,
    ADD COLUMN `barangayId` VARCHAR(191) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `barangay` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `barangayrequestpost` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `inKind` VARCHAR(255) NOT NULL,
    MODIFY `image` LONGBLOB NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `batch` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `comment` DROP PRIMARY KEY,
    DROP COLUMN `postId`,
    ADD COLUMN `barangayRequestPostId` VARCHAR(191) NULL,
    ADD COLUMN `recipientRequestPostId` VARCHAR(191) NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `content` TEXT NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `donation` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `donorId` VARCHAR(191) NOT NULL,
    MODIFY `barangayId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `donationitem` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `donationId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `donationstatuslog` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `donationId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `donor` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `like` DROP PRIMARY KEY,
    DROP COLUMN `postId`,
    ADD COLUMN `barangayRequestPostId` VARCHAR(191) NULL,
    ADD COLUMN `recipientRequestPostId` VARCHAR(191) NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `recipientrequestpost` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `uploadedPhoto` LONGBLOB NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `successstory` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `postId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Like_userId_barangayRequestPostId_key` ON `Like`(`userId`, `barangayRequestPostId`);

-- CreateIndex
CREATE UNIQUE INDEX `Like_userId_recipientRequestPostId_key` ON `Like`(`userId`, `recipientRequestPostId`);

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_barangayId_fkey` FOREIGN KEY (`barangayId`) REFERENCES `Barangay`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Donor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_barangayRequestPostId_fkey` FOREIGN KEY (`barangayRequestPostId`) REFERENCES `BarangayRequestPost`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_recipientRequestPostId_fkey` FOREIGN KEY (`recipientRequestPostId`) REFERENCES `RecipientRequestPost`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Donor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_barangayRequestPostId_fkey` FOREIGN KEY (`barangayRequestPostId`) REFERENCES `BarangayRequestPost`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_recipientRequestPostId_fkey` FOREIGN KEY (`recipientRequestPostId`) REFERENCES `RecipientRequestPost`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Donation` ADD CONSTRAINT `Donation_donorId_fkey` FOREIGN KEY (`donorId`) REFERENCES `Donor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Donation` ADD CONSTRAINT `Donation_barangayId_fkey` FOREIGN KEY (`barangayId`) REFERENCES `Barangay`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DonationItem` ADD CONSTRAINT `DonationItem_donationId_fkey` FOREIGN KEY (`donationId`) REFERENCES `Donation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DonationStatusLog` ADD CONSTRAINT `DonationStatusLog_donationId_fkey` FOREIGN KEY (`donationId`) REFERENCES `Donation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
