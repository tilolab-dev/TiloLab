/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `PopularProduct` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productId]` on the table `PromotedProduct` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PopularProduct_productId_key" ON "PopularProduct"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "PromotedProduct_productId_key" ON "PromotedProduct"("productId");
