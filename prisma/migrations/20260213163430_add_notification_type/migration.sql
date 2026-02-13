/*
  Warnings:

  - You are about to drop the column `userId` on the `AdminNotification` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('WARNING', 'ERROR', 'SUCCESS', 'DEFAULT');

-- AlterTable
ALTER TABLE "AdminNotification" DROP COLUMN "userId",
ADD COLUMN     "type" "NotificationType" NOT NULL DEFAULT 'WARNING';
