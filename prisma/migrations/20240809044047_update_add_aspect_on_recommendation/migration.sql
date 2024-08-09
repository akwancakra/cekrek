-- AlterTable
ALTER TABLE `children` MODIFY `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `monitor_child_recommendation` ADD COLUMN `name` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `recommendations` ADD COLUMN `aspect` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `updated_at` DATETIME(3) NULL;
