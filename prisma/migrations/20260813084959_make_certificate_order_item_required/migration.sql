-- AlterEnum
ALTER TYPE "CertificateStatus" ADD VALUE 'RESERVED';

-- AlterTable
ALTER TABLE "GiftCertificate" ADD COLUMN     "orderItemId" INTEGER,
ADD COLUMN     "reservedAt" TIMESTAMP(3),
ADD COLUMN     "reservedUntil" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "GiftCertificate" ADD CONSTRAINT "GiftCertificate_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "OrderItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
