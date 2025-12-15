/*
  Warnings:

  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Product_price_idx";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "price",
ALTER COLUMN "productPrice" SET DATA TYPE DOUBLE PRECISION;

-- CreateIndex
CREATE INDEX "Product_productSize_idx" ON "Product"("productSize");
