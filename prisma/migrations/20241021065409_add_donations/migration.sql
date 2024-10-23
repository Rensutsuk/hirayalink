/*
  Warnings:

  - You are about to drop the column `barangayNumberArea` on the `successstory` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `successstory` table. All the data in the column will be lost.
  - Added the required column `barangayRequestPostId` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `donation` ADD COLUMN `barangayRequestPostId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `successstory` DROP COLUMN `barangayNumberArea`,
    DROP COLUMN `postId`,
    ADD COLUMN `area` VARCHAR(191) NULL,
    ADD COLUMN `barangayId` VARCHAR(191) NULL,
    MODIFY `nameOfCalamity` VARCHAR(191) NULL,
    MODIFY `controlNumber` VARCHAR(191) NULL,
    MODIFY `transactionIds` TEXT NULL,
    MODIFY `batchNumber` VARCHAR(191) NULL,
    MODIFY `numberOfRecipients` INTEGER NULL,
    MODIFY `storyText` TEXT NULL,
    MODIFY `image` LONGBLOB NULL;

-- CreateTable
CREATE TABLE `calamityImpact` (
    `id` VARCHAR(191) NOT NULL,
    `barangayId` VARCHAR(191) NOT NULL,
    `area` VARCHAR(191) NOT NULL,
    `nameOfCalamity` VARCHAR(191) NOT NULL,
    `storyText` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `image` LONGBLOB NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Donation` ADD CONSTRAINT `Donation_barangayRequestPostId_fkey` FOREIGN KEY (`barangayRequestPostId`) REFERENCES `BarangayRequestPost`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SuccessStory` ADD CONSTRAINT `SuccessStory_barangayId_fkey` FOREIGN KEY (`barangayId`) REFERENCES `Barangay`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `calamityImpact` ADD CONSTRAINT `calamityImpact_barangayId_fkey` FOREIGN KEY (`barangayId`) REFERENCES `Barangay`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
