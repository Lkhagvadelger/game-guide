/*
  Warnings:

  - Added the required column `countryId` to the `Zar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Zar" ADD COLUMN     "countryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Zar" ADD CONSTRAINT "Zar_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
