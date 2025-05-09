-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "thumbnail" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Surname" TEXT;
