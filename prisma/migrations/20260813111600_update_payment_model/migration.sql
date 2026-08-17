-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('ORDER', 'CERTIFICATE_SURCHARGE');

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "type" "PaymentType" NOT NULL DEFAULT 'ORDER';
