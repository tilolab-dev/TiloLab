/*
  Warnings:

  - You are about to drop the column `adminId` on the `PopularProduct` table. All the data in the column will be lost.
  - You are about to drop the column `adminId` on the `PromotedProduct` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PopularProduct" DROP CONSTRAINT "PopularProduct_adminId_fkey";

-- DropForeignKey
ALTER TABLE "PromotedProduct" DROP CONSTRAINT "PromotedProduct_adminId_fkey";

-- AlterTable
ALTER TABLE "PopularProduct" DROP COLUMN "adminId";

-- AlterTable
ALTER TABLE "PromotedProduct" DROP COLUMN "adminId";
