/*
  Warnings:

  - A unique constraint covering the columns `[fieldKey]` on the table `ZarCatProperties` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ZarCatProperties" ALTER COLUMN "zarId" SET DEFAULT '',
ALTER COLUMN "catId" SET DEFAULT '',
ALTER COLUMN "str" SET DEFAULT '',
ALTER COLUMN "arrayString" SET DEFAULT ARRAY[]::TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "ZarCatProperties_fieldKey_key" ON "ZarCatProperties"("fieldKey");
