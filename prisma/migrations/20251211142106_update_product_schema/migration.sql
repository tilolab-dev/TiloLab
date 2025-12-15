/*
  Warnings:

  - You are about to drop the column `counterQuantity` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `groupPackQuantity` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `packageQuantity` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `packageType` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `productCapacity` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `productDensity` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `productWeight` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `wholesaleFrom` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `wholesaleOnly` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `wholesalePrice` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `groupPackage` on the `ProductTranslation` table. All the data in the column will be lost.
  - You are about to drop the column `wholesaleDescription` on the `ProductTranslation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "counterQuantity",
DROP COLUMN "groupPackQuantity",
DROP COLUMN "packageQuantity",
DROP COLUMN "packageType",
DROP COLUMN "productCapacity",
DROP COLUMN "productDensity",
DROP COLUMN "productWeight",
DROP COLUMN "wholesaleFrom",
DROP COLUMN "wholesaleOnly",
DROP COLUMN "wholesalePrice";

-- AlterTable
ALTER TABLE "ProductTranslation" DROP COLUMN "groupPackage",
DROP COLUMN "wholesaleDescription";
