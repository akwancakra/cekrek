-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `is_google` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teachers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `place_birth` VARCHAR(191) NULL,
    `date_time_birth` DATETIME(3) NULL,
    `religion` VARCHAR(191) NULL,
    `education` VARCHAR(191) NULL,
    `job` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `parents` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `place_birth` VARCHAR(191) NULL,
    `date_time_birth` DATETIME(3) NULL,
    `religion` VARCHAR(191) NULL,
    `education` VARCHAR(191) NULL,
    `job` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `children` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `parent_id` INTEGER NOT NULL,
    `full_name` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `place_birth` VARCHAR(191) NULL,
    `date_time_birth` DATETIME(3) NULL,
    `religion` VARCHAR(191) NULL,
    `count_of_siblings` INTEGER NULL,
    `risk_category` VARCHAR(191) NULL,
    `hearing_test` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `birth_history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `children_id` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `question` VARCHAR(191) NOT NULL,
    `answer` VARCHAR(191) NULL,

    UNIQUE INDEX `birth_history_children_id_key`(`children_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `health_status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `question` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `child_health_status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `children_id` INTEGER NOT NULL,
    `health_status_id` INTEGER NOT NULL,
    `answer` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `expert_examination` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `child_expert_examination` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `children_id` INTEGER NOT NULL,
    `expert_examination_id` INTEGER NOT NULL,
    `result` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recommendation` (
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

-- CreateTable
CREATE TABLE `child_recommendation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `children_id` INTEGER NOT NULL,
    `recommendation_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `children` ADD CONSTRAINT `children_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `parents`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `birth_history` ADD CONSTRAINT `birth_history_children_id_fkey` FOREIGN KEY (`children_id`) REFERENCES `children`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `child_health_status` ADD CONSTRAINT `child_health_status_children_id_fkey` FOREIGN KEY (`children_id`) REFERENCES `children`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `child_health_status` ADD CONSTRAINT `child_health_status_health_status_id_fkey` FOREIGN KEY (`health_status_id`) REFERENCES `health_status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `child_expert_examination` ADD CONSTRAINT `child_expert_examination_children_id_fkey` FOREIGN KEY (`children_id`) REFERENCES `children`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `child_expert_examination` ADD CONSTRAINT `child_expert_examination_expert_examination_id_fkey` FOREIGN KEY (`expert_examination_id`) REFERENCES `expert_examination`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `child_recommendation` ADD CONSTRAINT `child_recommendation_children_id_fkey` FOREIGN KEY (`children_id`) REFERENCES `children`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `child_recommendation` ADD CONSTRAINT `child_recommendation_recommendation_id_fkey` FOREIGN KEY (`recommendation_id`) REFERENCES `recommendation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
