/*
  Warnings:

  - You are about to drop the column `masterDataId` on the `Promos` table. All the data in the column will be lost.
  - Added the required column `typeMasterId` to the `Promos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Promos" DROP CONSTRAINT "Promos_masterDataId_fkey";

-- AlterTable
ALTER TABLE "Promos" DROP COLUMN "masterDataId",
ADD COLUMN     "typeMasterId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Promos" ADD CONSTRAINT "Promos_typeMasterId_fkey" FOREIGN KEY ("typeMasterId") REFERENCES "MasterData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
