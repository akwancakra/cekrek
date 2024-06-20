/*
  Warnings:

  - You are about to drop the `recommendation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `child_recommendation` DROP FOREIGN KEY `child_recommendation_recommendation_id_fkey`;

-- DropTable
DROP TABLE `recommendation`;

-- CreateTable
CREATE TABLE `recommendations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NULL,
    `duration` INTEGER NULL,
    `duration_type` VARCHAR(191) NULL,
    `repetition` INTEGER NULL,
    `risk_cateogry` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `child_recommendation` ADD CONSTRAINT `child_recommendation_recommendation_id_fkey` FOREIGN KEY (`recommendation_id`) REFERENCES `recommendations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
