-- DropForeignKey
ALTER TABLE "TagItems" DROP CONSTRAINT "TagItems_id_fkey";

-- AlterTable
ALTER TABLE "TagItems" ADD COLUMN     "productId" INTEGER;

-- AddForeignKey
ALTER TABLE "TagItems" ADD CONSTRAINT "TagItems_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
