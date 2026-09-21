/*
  Warnings:

  - You are about to drop the column `receiveByEmail` on the `OrderItem` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "CertificateDeliveryType" AS ENUM ('EMAIL', 'PHYSICAL', 'UNDEFINED');

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "receiveByEmail",
ADD COLUMN     "certificateDelivery" "CertificateDeliveryType" DEFAULT 'UNDEFINED';
