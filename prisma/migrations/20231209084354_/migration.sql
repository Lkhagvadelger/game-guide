/*
  Warnings:

  - You are about to drop the column `isActibve` on the `Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "isActibve",
ADD COLUMN     "isActive" BOOLEAN DEFAULT false;
