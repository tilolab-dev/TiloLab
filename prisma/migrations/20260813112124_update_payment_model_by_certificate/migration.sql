-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "certificateId" TEXT;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_certificateId_fkey" FOREIGN KEY ("certificateId") REFERENCES "GiftCertificate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
