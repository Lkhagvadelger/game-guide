/*
  Warnings:

  - You are about to drop the column `type` on the `Promos` table. All the data in the column will be lost.
  - Added the required column `categoryMainId` to the `Promos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryId` to the `Promos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `masterDataId` to the `Promos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Promos" DROP COLUMN "type",
ADD COLUMN     "categoryMainId" TEXT NOT NULL,
ADD COLUMN     "countryId" TEXT NOT NULL,
ADD COLUMN     "masterDataId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Promos" ADD CONSTRAINT "Promos_masterDataId_fkey" FOREIGN KEY ("masterDataId") REFERENCES "MasterData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promos" ADD CONSTRAINT "Promos_categoryMainId_fkey" FOREIGN KEY ("categoryMainId") REFERENCES "CategoryMain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promos" ADD CONSTRAINT "Promos_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
