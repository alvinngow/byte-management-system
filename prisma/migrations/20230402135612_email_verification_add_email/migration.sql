/*
  Warnings:

  - Added the required column `email` to the `EmailVerification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmailVerification" ADD COLUMN     "email" TEXT NOT NULL;
