/*
  Warnings:

  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- DropTable
DROP TABLE "Notification";

-- CreateTable
CREATE TABLE "AdminNotification" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "isReaded" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminNotification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AdminToAdminNotification" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AdminToAdminNotification_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AdminToAdminNotification_B_index" ON "_AdminToAdminNotification"("B");

-- AddForeignKey
ALTER TABLE "_AdminToAdminNotification" ADD CONSTRAINT "_AdminToAdminNotification_A_fkey" FOREIGN KEY ("A") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdminToAdminNotification" ADD CONSTRAINT "_AdminToAdminNotification_B_fkey" FOREIGN KEY ("B") REFERENCES "AdminNotification"("id") ON DELETE CASCADE ON UPDATE CASCADE;
