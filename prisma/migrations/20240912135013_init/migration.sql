/*
  Warnings:

  - You are about to drop the column `batchId` on the `donation` table. All the data in the column will be lost.
  - Added the required column `donationIds` to the `Batch` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `donation` DROP FOREIGN KEY `Donation_batchId_fkey`;

-- AlterTable
ALTER TABLE `barangayrequestpost` MODIFY `image` MEDIUMBLOB NULL;

-- AlterTable
ALTER TABLE `batch` ADD COLUMN `donationIds` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `donation` DROP COLUMN `batchId`;

-- CreateTable
CREATE TABLE `RecipientRequestPost` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `completeName` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `noOfFamilyMembers` INTEGER NOT NULL,
    `contactNumber` VARCHAR(191) NOT NULL,
    `emailAddress` VARCHAR(191) NULL,
    `barangay` VARCHAR(191) NOT NULL,
    `typeOfCalamity` VARCHAR(191) NOT NULL,
    `inKindNecessities` VARCHAR(255) NOT NULL,
    `specifications` TEXT NOT NULL,
    `uploadedPhoto` BLOB NOT NULL,
    `dateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SuccessStory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `postId` INTEGER NOT NULL,
    `barangayNumberArea` VARCHAR(191) NOT NULL,
    `nameOfCalamity` VARCHAR(191) NOT NULL,
    `controlNumber` VARCHAR(191) NOT NULL,
    `transactionIds` TEXT NOT NULL,
    `batchNumber` VARCHAR(191) NOT NULL,
    `numberOfRecipients` INTEGER NOT NULL,
    `storyText` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `image` MEDIUMBLOB NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
