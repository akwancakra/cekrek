/*
Warnings:
- You are about to drop the `child_recommendations` table. If the table is not empty, all the data it contains will be lost.
*/
-- DropForeignKey
ALTER TABLE `child_recommendations`
DROP FOREIGN KEY `child_recommendation_children_id_fkey`;

-- DropForeignKey
ALTER TABLE `child_recommendations`
DROP FOREIGN KEY `child_recommendation_recommendation_id_fkey`;

-- DropForeignKey
ALTER TABLE `monitor_child_recommendation`
DROP FOREIGN KEY `monitor_child_recommendation_child_recommendation_id_fkey`;

-- DropTable
DROP TABLE `child_recommendations`;

-- CreateTable
CREATE TABLE `child_recommendations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `children_id` INTEGER NOT NULL,
    `recommendation_id` INTEGER NOT NULL,


    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `child_recommendations`
ADD CONSTRAINT `child_recommendations_children_id_fkey` FOREIGN KEY (`children_id`) REFERENCES `children` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `child_recommendations`
ADD CONSTRAINT `child_recommendations_recommendation_id_fkey` FOREIGN KEY (`recommendation_id`) REFERENCES `recommendations` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `monitor_child_recommendation`
ADD CONSTRAINT `monitor_child_recommendation_child_recommendation_id_fkey` FOREIGN KEY (`child_recommendation_id`) REFERENCES `child_recommendations` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;