/*
  Warnings:

  - Added the required column `ownerId` to the `Taks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE
  "Taks"
ADD
  COLUMN "ownerId" INTEGER NOT NULL;
-- AddForeignKey
ALTER TABLE
  "Taks"
ADD
  CONSTRAINT "Taks_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;