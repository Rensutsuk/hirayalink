-- CreateTable
CREATE TABLE `Admin` (
    `adminID` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `brgyNumber` VARCHAR(191) NULL,
    `contactNumber` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Admin_name_key`(`name`),
    PRIMARY KEY (`adminID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Donor` (
    `donorID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `orgName` VARCHAR(191) NULL,
    `contactNumber` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Donor_name_key`(`name`),
    PRIMARY KEY (`donorID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
