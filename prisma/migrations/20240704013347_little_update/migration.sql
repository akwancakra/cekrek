-- AlterTable
ALTER TABLE `monitor_child_recommendation` ADD COLUMN `with_whom` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `recommendations` ADD COLUMN `teacher_id` INTEGER NULL,
    MODIFY `assesment_number` INTEGER NULL;
