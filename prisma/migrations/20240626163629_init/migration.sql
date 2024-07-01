-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NULL,
    `place_birth` VARCHAR(191) NULL,
    `date_time_birth` DATE NULL,
    `religion` VARCHAR(191) NULL,
    `education` VARCHAR(191) NULL,
    `job` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `is_google` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `children` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `full_name` VARCHAR(191) NOT NULL,
    `teacher_id` INTEGER NULL,
    `nick_name` VARCHAR(191) NULL,
    `picture` VARCHAR(191) NULL,
    `gender` VARCHAR(191) NOT NULL,
    `place_birth` VARCHAR(191) NULL,
    `date_time_birth` DATE NULL,
    `religion` VARCHAR(191) NULL,
    `count_of_siblings` INTEGER NULL,
    `risk_category` VARCHAR(191) NULL,
    `hearing_test` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `birth_history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `child_id` INTEGER NOT NULL,
    `healthy_pregnancy` VARCHAR(191) NULL,
    `pregnancy_illness` VARCHAR(191) NULL,
    `gestation_details` VARCHAR(191) NULL,
    `birthplace` VARCHAR(191) NULL,
    `birth_assistance` VARCHAR(191) NULL,
    `delivery_process` VARCHAR(191) NULL,
    `congenital_anomalies` VARCHAR(191) NULL,
    `first_food` VARCHAR(191) NULL,
    `formula_milk` VARCHAR(191) NULL,
    `immunization` VARCHAR(191) NULL,

    UNIQUE INDEX `birth_history_child_id_key`(`child_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `expert_examination` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `child_id` INTEGER NOT NULL,
    `pediatrician` VARCHAR(191) NULL,
    `rehabilitation` VARCHAR(191) NULL,
    `psychologist` VARCHAR(191) NULL,
    `therapist` VARCHAR(191) NULL,

    UNIQUE INDEX `expert_examination_child_id_key`(`child_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `health_status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `child_id` INTEGER NOT NULL,
    `serious_illness` VARCHAR(191) NULL,
    `current_diseases` VARCHAR(191) NULL,
    `treatment_location` VARCHAR(191) NULL,
    `treatment_duration` VARCHAR(191) NULL,
    `general_comparison` VARCHAR(191) NULL,
    `crawling_development` VARCHAR(191) NULL,
    `sitting_development` VARCHAR(191) NULL,
    `walking_development` VARCHAR(191) NULL,
    `first_words_age` VARCHAR(191) NULL,
    `speaking_fluency_age` VARCHAR(191) NULL,
    `bedwetting` VARCHAR(191) NULL,

    UNIQUE INDEX `health_status_child_id_key`(`child_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `recommendations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `assesment_number` INTEGER NOT NULL,
    `is_main` BOOLEAN NOT NULL DEFAULT false,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `icon` VARCHAR(191) NULL,
    `frequency` VARCHAR(191) NULL,
    `risk_category` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `child_recommendations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `children_id` INTEGER NOT NULL,
    `recommendation_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `monitor_child_recommendation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `child_recommendation_id` INTEGER NOT NULL,
    `date_time` DATE NOT NULL,
    `is_done` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `assesments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `assesment_number` INTEGER NOT NULL,
    `question` TEXT NOT NULL,
    `picture` VARCHAR(191) NULL,

    UNIQUE INDEX `assesments_assesment_number_key`(`assesment_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `child_assesment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `assesment_type` VARCHAR(191) NOT NULL DEFAULT 'awal',
    `children_id` INTEGER NOT NULL,
    `assesment_id` INTEGER NOT NULL,
    `answer` VARCHAR(191) NOT NULL,
    `date_time` DATE NOT NULL,

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
ALTER TABLE `birth_history` ADD CONSTRAINT `birth_history_child_id_fkey` FOREIGN KEY (`child_id`) REFERENCES `children`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `expert_examination` ADD CONSTRAINT `expert_examination_child_id_fkey` FOREIGN KEY (`child_id`) REFERENCES `children`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `health_status` ADD CONSTRAINT `health_status_child_id_fkey` FOREIGN KEY (`child_id`) REFERENCES `children`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `child_recommendations` ADD CONSTRAINT `child_recommendations_children_id_fkey` FOREIGN KEY (`children_id`) REFERENCES `children`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `child_recommendations` ADD CONSTRAINT `child_recommendations_recommendation_id_fkey` FOREIGN KEY (`recommendation_id`) REFERENCES `recommendations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `monitor_child_recommendation` ADD CONSTRAINT `monitor_child_recommendation_child_recommendation_id_fkey` FOREIGN KEY (`child_recommendation_id`) REFERENCES `child_recommendations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `child_assesment` ADD CONSTRAINT `child_assesment_children_id_fkey` FOREIGN KEY (`children_id`) REFERENCES `children`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `child_assesment` ADD CONSTRAINT `child_assesment_assesment_id_fkey` FOREIGN KEY (`assesment_id`) REFERENCES `assesments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_childrenTousers` ADD CONSTRAINT `_childrenTousers_A_fkey` FOREIGN KEY (`A`) REFERENCES `children`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_childrenTousers` ADD CONSTRAINT `_childrenTousers_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
