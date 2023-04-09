/*
  Warnings:

  - You are about to drop the column `userId` on the `EmailVerification` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "EmailVerification" DROP CONSTRAINT "EmailVerification_userId_fkey";

-- AlterTable
ALTER TABLE "EmailVerification" DROP COLUMN "userId";
