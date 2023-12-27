/*
  Warnings:

  - Made the column `sortIndex` on table `Category` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "sortIndex" SET NOT NULL,
ALTER COLUMN "sortIndex" SET DEFAULT 99999;

-- AlterTable
ALTER TABLE "Promos" ADD COLUMN     "expiredAt" TIMESTAMP(3);
