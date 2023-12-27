-- CreateTable
CREATE TABLE "Promos" (
    "id" TEXT NOT NULL,
    "type" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "media" JSONB,
    "zarId" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Promos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Promos_id_key" ON "Promos"("id");

-- AddForeignKey
ALTER TABLE "Promos" ADD CONSTRAINT "Promos_zarId_fkey" FOREIGN KEY ("zarId") REFERENCES "Zar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promos" ADD CONSTRAINT "Promos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
