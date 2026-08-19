/*
  Warnings:

  - Made the column `orderItemId` on table `GiftCertificate` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "GiftCertificate" DROP CONSTRAINT "GiftCertificate_orderItemId_fkey";

-- AlterTable
ALTER TABLE "GiftCertificate" ALTER COLUMN "orderItemId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "GiftCertificate" ADD CONSTRAINT "GiftCertificate_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "OrderItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
