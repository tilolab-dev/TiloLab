-- AlterEnum
ALTER TYPE "OrderStatus" ADD VALUE 'EXPIRED';

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "stockReserved" INTEGER DEFAULT 0;
