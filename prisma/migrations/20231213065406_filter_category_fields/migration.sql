-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "filterCategory" SET DEFAULT '{}';

-- CreateTable
CREATE TABLE "ZarCatProperties" (
    "id" TEXT NOT NULL,
    "zarId" TEXT NOT NULL,
    "catId" TEXT NOT NULL,
    "fieldKey" TEXT NOT NULL,
    "number" DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    "str" TEXT NOT NULL,
    "arrayString" TEXT[],

    CONSTRAINT "ZarCatProperties_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ZarCatProperties" ADD CONSTRAINT "ZarCatProperties_zarId_fkey" FOREIGN KEY ("zarId") REFERENCES "Zar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ZarCatProperties" ADD CONSTRAINT "ZarCatProperties_catId_fkey" FOREIGN KEY ("catId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
