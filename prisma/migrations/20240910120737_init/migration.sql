/*
  Warnings:

  - A unique constraint covering the columns `[contactNumber]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contactNumber]` on the table `Donor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Admin_contactNumber_key` ON `Admin`(`contactNumber`);

-- CreateIndex
CREATE UNIQUE INDEX `Donor_contactNumber_key` ON `Donor`(`contactNumber`);
