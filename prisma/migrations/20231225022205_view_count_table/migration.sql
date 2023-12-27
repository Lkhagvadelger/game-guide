/*
  Warnings:

  - You are about to drop the column `viewCount` on the `Zar` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Zar" DROP COLUMN "viewCount";

-- CreateTable
CREATE TABLE "ZarProperties" (
    "id" TEXT NOT NULL,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ZarProperties_pkey" PRIMARY KEY ("id")
);
