/*
  Warnings:

  - You are about to drop the column `manufactureCounty` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "manufactureCounty";

-- AlterTable
ALTER TABLE "ProductTranslation" ADD COLUMN     "productManufacture" TEXT DEFAULT '-';
