/*
  Warnings:

  - You are about to drop the column `parents` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "parents",
ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isParent" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "activate" SET DEFAULT true;
