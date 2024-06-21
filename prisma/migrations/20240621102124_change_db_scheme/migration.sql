/*
  Warnings:

  - You are about to drop the column `answer` on the `birth_history` table. All the data in the column will be lost.
  - You are about to drop the column `children_id` on the `birth_history` table. All the data in the column will be lost.
  - You are about to drop the column `parent_id` on the `children` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `birth_history` DROP FOREIGN KEY `birth_history_children_id_fkey`;

-- DropForeignKey
ALTER TABLE `children` DROP FOREIGN KEY `children_parent_id_fkey`;

-- AlterTable
ALTER TABLE `birth_history` DROP COLUMN `answer`,
    DROP COLUMN `children_id`,
    ADD COLUMN `example_answer` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `children` DROP COLUMN `parent_id`,
    ADD COLUMN `nick_name` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `health_status` ADD COLUMN `example_answer` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `child_birth_history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `children_id` INTEGER NOT NULL,
    `birth_history_id` INTEGER NOT NULL,
    `answer` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_childrenTousers` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_childrenTousers_AB_unique`(`A`, `B`),
    INDEX `_childrenTousers_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `child_birth_history` ADD CONSTRAINT `child_birth_history_children_id_fkey` FOREIGN KEY (`children_id`) REFERENCES `children`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `child_birth_history` ADD CONSTRAINT `child_birth_history_birth_history_id_fkey` FOREIGN KEY (`birth_history_id`) REFERENCES `birth_history`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_childrenTousers` ADD CONSTRAINT `_childrenTousers_A_fkey` FOREIGN KEY (`A`) REFERENCES `children`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_childrenTousers` ADD CONSTRAINT `_childrenTousers_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
