-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('PRODUCT', 'CERTIFICATE');

-- CreateEnum
CREATE TYPE "CertificateStatus" AS ENUM ('ACTIVE', 'USED');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isCertificate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "productType" "ProductType" NOT NULL DEFAULT 'PRODUCT';

-- CreateTable
CREATE TABLE "GiftCertificate" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "CertificateStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usedAt" TIMESTAMP(3),
    "orderId" TEXT NOT NULL,
    "usedOrderId" TEXT,

    CONSTRAINT "GiftCertificate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GiftCertificate_code_key" ON "GiftCertificate"("code");

-- AddForeignKey
ALTER TABLE "GiftCertificate" ADD CONSTRAINT "GiftCertificate_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GiftCertificate" ADD CONSTRAINT "GiftCertificate_usedOrderId_fkey" FOREIGN KEY ("usedOrderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
