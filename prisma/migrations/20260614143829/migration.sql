/*
  Warnings:

  - Made the column `isParent` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "isParent" SET NOT NULL;
