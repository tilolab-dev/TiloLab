-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "refundedAmount" INTEGER DEFAULT 0,
ADD COLUMN     "refundedAt" TIMESTAMP(3);
