-- CreateTable
CREATE TABLE `BarangayRequestPost` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `controlNumber` VARCHAR(191) NOT NULL,
    `barangay` VARCHAR(191) NOT NULL,
    `person` VARCHAR(191) NOT NULL,
    `typeOfCalamity` VARCHAR(191) NOT NULL,
    `inKind` VARCHAR(191) NOT NULL,
    `contactNumber` VARCHAR(191) NOT NULL,
    `dropOffAddress` VARCHAR(191) NOT NULL,
    `dropOffLandmark` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NULL,
    `dateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `BarangayRequestPost_controlNumber_key`(`controlNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Like` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `postId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Like_userId_postId_key`(`userId`, `postId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `BarangayRequestPost`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
