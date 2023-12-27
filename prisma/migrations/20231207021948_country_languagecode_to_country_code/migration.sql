/*
  Warnings:

  - You are about to drop the column `languageCode` on the `Country` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[countryCode]` on the table `Country` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `countryCode` to the `Country` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Country_languageCode_key";

-- AlterTable
ALTER TABLE "Country" DROP COLUMN "languageCode",
ADD COLUMN     "countryCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Country_countryCode_key" ON "Country"("countryCode");
