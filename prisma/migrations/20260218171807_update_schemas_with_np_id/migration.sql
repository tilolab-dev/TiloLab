-- AlterTable
ALTER TABLE "AdminSender" ADD COLUMN     "NPcityId" TEXT,
ADD COLUMN     "NPcontactSenderId" TEXT,
ADD COLUMN     "NPsenderAddressId" TEXT,
ADD COLUMN     "NPsenderId" TEXT;

-- AlterTable
ALTER TABLE "ShippingInfo" ADD COLUMN     "NPcityId" TEXT,
ADD COLUMN     "NPwarehouseId" TEXT;
