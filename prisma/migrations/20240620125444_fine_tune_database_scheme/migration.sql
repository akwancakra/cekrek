/*
  Warnings:

  - You are about to drop the column `risk_cateogry` on the `recommendations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `recommendations` DROP COLUMN `risk_cateogry`,
    ADD COLUMN `risk_category` VARCHAR(191) NULL;
