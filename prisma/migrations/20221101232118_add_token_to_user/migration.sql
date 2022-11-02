/*
  Warnings:

  - You are about to drop the `UserOrder` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[token,userId]` on the table `BlackListedToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `BlackListedToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `BlackListedToken_token_key` ON `BlackListedToken`;

-- DropIndex
DROP INDEX `token` ON `BlackListedToken`;

-- AlterTable
ALTER TABLE `BlackListedToken` ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `EmailValidationToken` MODIFY `token` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `token` VARCHAR(255) NULL;

-- DropTable
DROP TABLE `UserOrder`;

-- CreateIndex
CREATE INDEX `BlackListedToken_token_userId_idx` ON `BlackListedToken`(`token`, `userId`);

-- CreateIndex
CREATE UNIQUE INDEX `token_user_id` ON `BlackListedToken`(`token`, `userId`);
