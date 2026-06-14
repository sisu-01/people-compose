/*
  Warnings:

  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `type` on the `Subject` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SubjectType" AS ENUM ('B', 'D', 'R');

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "type",
ADD COLUMN     "type" "SubjectType" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "username",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
