-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "productSize" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProductTranslation" ALTER COLUMN "productDescription" SET DEFAULT '-',
ALTER COLUMN "productColor" DROP NOT NULL,
ALTER COLUMN "productColor" SET DEFAULT '-',
ALTER COLUMN "productMaterial" DROP NOT NULL,
ALTER COLUMN "productMaterial" SET DEFAULT '-';
