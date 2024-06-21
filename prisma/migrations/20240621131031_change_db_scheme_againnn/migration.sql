/*
  Warnings:

  - You are about to drop the column `example_answer` on the `birth_history` table. All the data in the column will be lost.
  - You are about to drop the column `question` on the `birth_history` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `birth_history` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `expert_examination` table. All the data in the column will be lost.
  - You are about to drop the column `example_answer` on the `health_status` table. All the data in the column will be lost.
  - You are about to drop the column `question` on the `health_status` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `health_status` table. All the data in the column will be lost.
  - You are about to drop the `child_birth_history` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `child_expert_examination` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `child_health_status` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[child_id]` on the table `birth_history` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[child_id]` on the table `expert_examination` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[child_id]` on the table `health_status` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `child_id` to the `birth_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `child_id` to the `expert_examination` table without a default value. This is not possible if the table is not empty.
  - Added the required column `child_id` to the `health_status` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `child_birth_history` DROP FOREIGN KEY `child_birth_history_birth_history_id_fkey`;

-- DropForeignKey
ALTER TABLE `child_birth_history` DROP FOREIGN KEY `child_birth_history_children_id_fkey`;

-- DropForeignKey
ALTER TABLE `child_expert_examination` DROP FOREIGN KEY `child_expert_examination_children_id_fkey`;

-- DropForeignKey
ALTER TABLE `child_expert_examination` DROP FOREIGN KEY `child_expert_examination_expert_examination_id_fkey`;

-- DropForeignKey
ALTER TABLE `child_health_status` DROP FOREIGN KEY `child_health_status_children_id_fkey`;

-- DropForeignKey
ALTER TABLE `child_health_status` DROP FOREIGN KEY `child_health_status_health_status_id_fkey`;

-- AlterTable
ALTER TABLE `birth_history` DROP COLUMN `example_answer`,
    DROP COLUMN `question`,
    DROP COLUMN `type`,
    ADD COLUMN `birth_assistance` VARCHAR(191) NULL,
    ADD COLUMN `birthplace` VARCHAR(191) NULL,
    ADD COLUMN `child_id` INTEGER NOT NULL,
    ADD COLUMN `congenital_anomalies` VARCHAR(191) NULL,
    ADD COLUMN `delivery_process` VARCHAR(191) NULL,
    ADD COLUMN `first_food` VARCHAR(191) NULL,
    ADD COLUMN `formula_milk` VARCHAR(191) NULL,
    ADD COLUMN `gestation_details` VARCHAR(191) NULL,
    ADD COLUMN `healthy_pregnancy` VARCHAR(191) NULL,
    ADD COLUMN `immunization` VARCHAR(191) NULL,
    ADD COLUMN `pregnancy_illness` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `expert_examination` DROP COLUMN `type`,
    ADD COLUMN `child_id` INTEGER NOT NULL,
    ADD COLUMN `pediatrician` VARCHAR(191) NULL,
    ADD COLUMN `psychologist` VARCHAR(191) NULL,
    ADD COLUMN `rehabilitation` VARCHAR(191) NULL,
    ADD COLUMN `therapist` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `health_status` DROP COLUMN `example_answer`,
    DROP COLUMN `question`,
    DROP COLUMN `type`,
    ADD COLUMN `bedwetting` VARCHAR(191) NULL,
    ADD COLUMN `child_id` INTEGER NOT NULL,
    ADD COLUMN `crawling_development` VARCHAR(191) NULL,
    ADD COLUMN `current_diseases` VARCHAR(191) NULL,
    ADD COLUMN `first_words_age` VARCHAR(191) NULL,
    ADD COLUMN `general_comparison` VARCHAR(191) NULL,
    ADD COLUMN `serious_illness` VARCHAR(191) NULL,
    ADD COLUMN `sitting_development` VARCHAR(191) NULL,
    ADD COLUMN `speaking_fluency_age` VARCHAR(191) NULL,
    ADD COLUMN `treatment_duration` VARCHAR(191) NULL,
    ADD COLUMN `treatment_location` VARCHAR(191) NULL,
    ADD COLUMN `walking_development` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `child_birth_history`;

-- DropTable
DROP TABLE `child_expert_examination`;

-- DropTable
DROP TABLE `child_health_status`;

-- CreateTable
CREATE TABLE `birth_history_question` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `question` VARCHAR(191) NOT NULL,
    `example_answer` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `health_status_question` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `question` VARCHAR(191) NOT NULL,
    `example_answer` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `expert_examination_question` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `birth_history_child_id_key` ON `birth_history`(`child_id`);

-- CreateIndex
CREATE UNIQUE INDEX `expert_examination_child_id_key` ON `expert_examination`(`child_id`);

-- CreateIndex
CREATE UNIQUE INDEX `health_status_child_id_key` ON `health_status`(`child_id`);

-- AddForeignKey
ALTER TABLE `birth_history` ADD CONSTRAINT `birth_history_child_id_fkey` FOREIGN KEY (`child_id`) REFERENCES `children`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `expert_examination` ADD CONSTRAINT `expert_examination_child_id_fkey` FOREIGN KEY (`child_id`) REFERENCES `children`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `health_status` ADD CONSTRAINT `health_status_child_id_fkey` FOREIGN KEY (`child_id`) REFERENCES `children`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
