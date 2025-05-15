/*
  Warnings:

  - You are about to drop the column `userId` on the `CommentLike` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[commentId]` on the table `CommentLike` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "CommentLike_userId_commentId_key";

-- AlterTable
ALTER TABLE "CommentLike" DROP COLUMN "userId";

-- CreateIndex
CREATE UNIQUE INDEX "CommentLike_commentId_key" ON "CommentLike"("commentId");
