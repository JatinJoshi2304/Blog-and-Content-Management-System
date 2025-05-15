/*
  Warnings:

  - A unique constraint covering the columns `[userId,commentId]` on the table `CommentLike` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `CommentLike` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "CommentLike_commentId_key";

-- AlterTable
ALTER TABLE "CommentLike" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CommentLike_userId_commentId_key" ON "CommentLike"("userId", "commentId");

-- AddForeignKey
ALTER TABLE "CommentLike" ADD CONSTRAINT "CommentLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
