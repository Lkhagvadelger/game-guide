/*
  Warnings:

  - You are about to drop the `ZarTypes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `countryId` to the `MasterData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MasterData" ADD COLUMN     "countryId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ZarTypes";

-- AddForeignKey
ALTER TABLE "MasterData" ADD CONSTRAINT "MasterData_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
