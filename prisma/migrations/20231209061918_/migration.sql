-- DropForeignKey
ALTER TABLE "Promos" DROP CONSTRAINT "Promos_zarId_fkey";

-- AlterTable
ALTER TABLE "Promos" ALTER COLUMN "zarId" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Promos" ADD CONSTRAINT "Promos_zarId_fkey" FOREIGN KEY ("zarId") REFERENCES "Zar"("id") ON DELETE SET NULL ON UPDATE CASCADE;
