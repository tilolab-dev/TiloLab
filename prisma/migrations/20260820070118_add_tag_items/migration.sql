/*
  Warnings:

  - You are about to drop the column `tag` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "tag";

-- CreateTable
CREATE TABLE "TagItems" (
    "id" SERIAL NOT NULL,
    "tagName" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "TagItems_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TagItems_tagName_key" ON "TagItems"("tagName");

-- CreateIndex
CREATE UNIQUE INDEX "TagItems_tagId_key" ON "TagItems"("tagId");

-- AddForeignKey
ALTER TABLE "TagItems" ADD CONSTRAINT "TagItems_id_fkey" FOREIGN KEY ("id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
