-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "optionId" INTEGER;

-- AlterTable
ALTER TABLE "ProductOptions" ADD COLUMN     "optionReserved" INTEGER DEFAULT 0;
