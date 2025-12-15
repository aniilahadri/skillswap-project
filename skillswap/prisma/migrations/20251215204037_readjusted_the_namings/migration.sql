/*
  Warnings:

  - The primary key for the `admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `adminId` on the `admin` table. All the data in the column will be lost.
  - The primary key for the `contact` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `contact` table. All the data in the column will be lost.
  - The primary key for the `favorite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `favStudentId` on the `favorite` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `favorite` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `favorite` table. All the data in the column will be lost.
  - The primary key for the `phonenumber` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `phonenumber` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `phonenumber` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `refreshtoken` table. All the data in the column will be lost.
  - The primary key for the `report` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `report` table. All the data in the column will be lost.
  - You are about to drop the column `reportedUserId` on the `report` table. All the data in the column will be lost.
  - You are about to drop the column `reporterId` on the `report` table. All the data in the column will be lost.
  - The primary key for the `request` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `request` table. All the data in the column will be lost.
  - You are about to drop the column `offeredSkillId` on the `request` table. All the data in the column will be lost.
  - You are about to drop the column `receiverId` on the `request` table. All the data in the column will be lost.
  - You are about to drop the column `requestedSkillId` on the `request` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `request` table. All the data in the column will be lost.
  - The primary key for the `skill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `skill` table. All the data in the column will be lost.
  - The primary key for the `skilloffered` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `skilloffered` table. All the data in the column will be lost.
  - You are about to drop the column `skillId` on the `skilloffered` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `skilloffered` table. All the data in the column will be lost.
  - The primary key for the `skillwanted` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `skillwanted` table. All the data in the column will be lost.
  - You are about to drop the column `skillId` on the `skillwanted` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `skillwanted` table. All the data in the column will be lost.
  - The primary key for the `student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `studentId` on the `student` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sender_ID,receiver_ID,requestedSkill_ID,offeredSkill_ID]` on the table `Request` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `admin_ID` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact_ID` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `favStudent_ID` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - The required column `favorite_ID` was added to the `Favorite` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `student_ID` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_ID` to the `PhoneNumber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_ID` to the `PhoneNumber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_ID` to the `RefreshToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `admin_ID` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `report_ID` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reportedUser_ID` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reporter_ID` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `offeredSkill_ID` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiver_ID` to the `Request` table without a default value. This is not possible if the table is not empty.
  - The required column `request_ID` was added to the `Request` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `requestedSkill_ID` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender_ID` to the `Request` table without a default value. This is not possible if the table is not empty.
  - The required column `skill_ID` was added to the `Skill` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `skillOffered_ID` was added to the `SkillOffered` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `skill_ID` to the `SkillOffered` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_ID` to the `SkillOffered` table without a default value. This is not possible if the table is not empty.
  - The required column `skillWanted_ID` was added to the `SkillWanted` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `skill_ID` to the `SkillWanted` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_ID` to the `SkillWanted` table without a default value. This is not possible if the table is not empty.
  - Added the required column `availability` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_ID` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `User` table without a default value. This is not possible if the table is not empty.
  - The required column `user_ID` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `admin` DROP FOREIGN KEY `Admin_adminId_fkey`;

-- DropForeignKey
ALTER TABLE `favorite` DROP FOREIGN KEY `Favorite_favStudentId_fkey`;

-- DropForeignKey
ALTER TABLE `favorite` DROP FOREIGN KEY `Favorite_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `phonenumber` DROP FOREIGN KEY `PhoneNumber_userId_fkey`;

-- DropForeignKey
ALTER TABLE `refreshtoken` DROP FOREIGN KEY `RefreshToken_userId_fkey`;

-- DropForeignKey
ALTER TABLE `report` DROP FOREIGN KEY `Report_reportedUserId_fkey`;

-- DropForeignKey
ALTER TABLE `report` DROP FOREIGN KEY `Report_reporterId_fkey`;

-- DropForeignKey
ALTER TABLE `request` DROP FOREIGN KEY `Request_offeredSkillId_fkey`;

-- DropForeignKey
ALTER TABLE `request` DROP FOREIGN KEY `Request_receiverId_fkey`;

-- DropForeignKey
ALTER TABLE `request` DROP FOREIGN KEY `Request_requestedSkillId_fkey`;

-- DropForeignKey
ALTER TABLE `request` DROP FOREIGN KEY `Request_senderId_fkey`;

-- DropForeignKey
ALTER TABLE `skilloffered` DROP FOREIGN KEY `SkillOffered_skillId_fkey`;

-- DropForeignKey
ALTER TABLE `skilloffered` DROP FOREIGN KEY `SkillOffered_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `skillwanted` DROP FOREIGN KEY `SkillWanted_skillId_fkey`;

-- DropForeignKey
ALTER TABLE `skillwanted` DROP FOREIGN KEY `SkillWanted_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `Student_studentId_fkey`;

-- DropIndex
DROP INDEX `Favorite_favStudentId_fkey` ON `favorite`;

-- DropIndex
DROP INDEX `Favorite_studentId_fkey` ON `favorite`;

-- DropIndex
DROP INDEX `PhoneNumber_userId_fkey` ON `phonenumber`;

-- DropIndex
DROP INDEX `RefreshToken_userId_fkey` ON `refreshtoken`;

-- DropIndex
DROP INDEX `Report_reportedUserId_idx` ON `report`;

-- DropIndex
DROP INDEX `Report_reporterId_idx` ON `report`;

-- DropIndex
DROP INDEX `Request_offeredSkillId_fkey` ON `request`;

-- DropIndex
DROP INDEX `Request_receiverId_fkey` ON `request`;

-- DropIndex
DROP INDEX `Request_requestedSkillId_fkey` ON `request`;

-- DropIndex
DROP INDEX `Request_senderId_receiverId_requestedSkillId_offeredSkillId_key` ON `request`;

-- DropIndex
DROP INDEX `SkillOffered_skillId_fkey` ON `skilloffered`;

-- DropIndex
DROP INDEX `SkillOffered_studentId_fkey` ON `skilloffered`;

-- DropIndex
DROP INDEX `SkillWanted_skillId_fkey` ON `skillwanted`;

-- DropIndex
DROP INDEX `SkillWanted_studentId_fkey` ON `skillwanted`;

-- AlterTable
ALTER TABLE `admin` DROP PRIMARY KEY,
    DROP COLUMN `adminId`,
    ADD COLUMN `admin_ID` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`admin_ID`);

-- AlterTable
ALTER TABLE `contact` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `contact_ID` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`contact_ID`);

-- AlterTable
ALTER TABLE `favorite` DROP PRIMARY KEY,
    DROP COLUMN `favStudentId`,
    DROP COLUMN `id`,
    DROP COLUMN `studentId`,
    ADD COLUMN `favStudent_ID` VARCHAR(191) NOT NULL,
    ADD COLUMN `favorite_ID` VARCHAR(191) NOT NULL,
    ADD COLUMN `student_ID` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`favorite_ID`);

-- AlterTable
ALTER TABLE `phonenumber` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `userId`,
    ADD COLUMN `phone_ID` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `user_ID` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`phone_ID`);

-- AlterTable
ALTER TABLE `refreshtoken` DROP COLUMN `userId`,
    ADD COLUMN `user_ID` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `report` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `reportedUserId`,
    DROP COLUMN `reporterId`,
    ADD COLUMN `admin_ID` VARCHAR(191) NOT NULL,
    ADD COLUMN `report_ID` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `reportedUser_ID` VARCHAR(191) NOT NULL,
    ADD COLUMN `reporter_ID` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`report_ID`);

-- AlterTable
ALTER TABLE `request` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `offeredSkillId`,
    DROP COLUMN `receiverId`,
    DROP COLUMN `requestedSkillId`,
    DROP COLUMN `senderId`,
    ADD COLUMN `offeredSkill_ID` VARCHAR(191) NOT NULL,
    ADD COLUMN `receiver_ID` VARCHAR(191) NOT NULL,
    ADD COLUMN `request_ID` VARCHAR(191) NOT NULL,
    ADD COLUMN `requestedSkill_ID` VARCHAR(191) NOT NULL,
    ADD COLUMN `sender_ID` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`request_ID`);

-- AlterTable
ALTER TABLE `skill` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `skill_ID` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`skill_ID`);

-- AlterTable
ALTER TABLE `skilloffered` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `skillId`,
    DROP COLUMN `studentId`,
    ADD COLUMN `skillOffered_ID` VARCHAR(191) NOT NULL,
    ADD COLUMN `skill_ID` VARCHAR(191) NOT NULL,
    ADD COLUMN `student_ID` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`skillOffered_ID`);

-- AlterTable
ALTER TABLE `skillwanted` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `skillId`,
    DROP COLUMN `studentId`,
    ADD COLUMN `skillWanted_ID` VARCHAR(191) NOT NULL,
    ADD COLUMN `skill_ID` VARCHAR(191) NOT NULL,
    ADD COLUMN `student_ID` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`skillWanted_ID`);

-- AlterTable
ALTER TABLE `student` DROP PRIMARY KEY,
    DROP COLUMN `studentId`,
    ADD COLUMN `availability` ENUM('Morning', 'Afternoon', 'Evening') NOT NULL,
    ADD COLUMN `student_ID` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`student_ID`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `state`,
    ADD COLUMN `country` VARCHAR(191) NOT NULL,
    ADD COLUMN `user_ID` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`user_ID`);

-- CreateIndex
CREATE INDEX `Report_reporter_ID_idx` ON `Report`(`reporter_ID`);

-- CreateIndex
CREATE INDEX `Report_reportedUser_ID_idx` ON `Report`(`reportedUser_ID`);

-- CreateIndex
CREATE UNIQUE INDEX `Request_sender_ID_receiver_ID_requestedSkill_ID_offeredSkill_key` ON `Request`(`sender_ID`, `receiver_ID`, `requestedSkill_ID`, `offeredSkill_ID`);

-- AddForeignKey
ALTER TABLE `PhoneNumber` ADD CONSTRAINT `PhoneNumber_user_ID_fkey` FOREIGN KEY (`user_ID`) REFERENCES `User`(`user_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_admin_ID_fkey` FOREIGN KEY (`admin_ID`) REFERENCES `User`(`user_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_student_ID_fkey` FOREIGN KEY (`student_ID`) REFERENCES `User`(`user_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SkillOffered` ADD CONSTRAINT `SkillOffered_student_ID_fkey` FOREIGN KEY (`student_ID`) REFERENCES `Student`(`student_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SkillOffered` ADD CONSTRAINT `SkillOffered_skill_ID_fkey` FOREIGN KEY (`skill_ID`) REFERENCES `Skill`(`skill_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SkillWanted` ADD CONSTRAINT `SkillWanted_student_ID_fkey` FOREIGN KEY (`student_ID`) REFERENCES `Student`(`student_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SkillWanted` ADD CONSTRAINT `SkillWanted_skill_ID_fkey` FOREIGN KEY (`skill_ID`) REFERENCES `Skill`(`skill_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Request` ADD CONSTRAINT `Request_sender_ID_fkey` FOREIGN KEY (`sender_ID`) REFERENCES `Student`(`student_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Request` ADD CONSTRAINT `Request_receiver_ID_fkey` FOREIGN KEY (`receiver_ID`) REFERENCES `Student`(`student_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Request` ADD CONSTRAINT `Request_requestedSkill_ID_fkey` FOREIGN KEY (`requestedSkill_ID`) REFERENCES `SkillOffered`(`skillOffered_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Request` ADD CONSTRAINT `Request_offeredSkill_ID_fkey` FOREIGN KEY (`offeredSkill_ID`) REFERENCES `SkillWanted`(`skillWanted_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_student_ID_fkey` FOREIGN KEY (`student_ID`) REFERENCES `Student`(`student_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_favStudent_ID_fkey` FOREIGN KEY (`favStudent_ID`) REFERENCES `Student`(`student_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_reporter_ID_fkey` FOREIGN KEY (`reporter_ID`) REFERENCES `Student`(`student_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_reportedUser_ID_fkey` FOREIGN KEY (`reportedUser_ID`) REFERENCES `Student`(`student_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_admin_ID_fkey` FOREIGN KEY (`admin_ID`) REFERENCES `Admin`(`admin_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RefreshToken` ADD CONSTRAINT `RefreshToken_user_ID_fkey` FOREIGN KEY (`user_ID`) REFERENCES `User`(`user_ID`) ON DELETE CASCADE ON UPDATE CASCADE;
