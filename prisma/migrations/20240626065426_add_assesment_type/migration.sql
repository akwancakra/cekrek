/*
  Warnings:

  - A unique constraint covering the columns `[assesment_number]` on the table `assesments` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `child_assesment` ADD COLUMN `assesment_type` VARCHAR(191) NOT NULL DEFAULT 'awal';

-- CreateIndex
CREATE UNIQUE INDEX `assesments_assesment_number_key` ON `assesments`(`assesment_number`);
