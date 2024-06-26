-- AlterTable
ALTER TABLE `child_assesment` MODIFY `date_time` DATE NOT NULL;

-- AlterTable
ALTER TABLE `monitor_child_recommendation` MODIFY `date_time` DATE NOT NULL;

-- AddForeignKey
ALTER TABLE `monitor_child_recommendation` ADD CONSTRAINT `monitor_child_recommendation_child_recommendation_id_fkey` FOREIGN KEY (`child_recommendation_id`) REFERENCES `child_recommendation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
