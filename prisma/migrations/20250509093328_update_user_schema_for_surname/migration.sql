/*
  Warnings:

  - You are about to drop the column `Surname` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "Surname",
ADD COLUMN     "surname" TEXT;
