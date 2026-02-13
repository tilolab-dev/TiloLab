-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "deliveryTtn" TEXT;

-- CreateTable
CREATE TABLE "AdminSender" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "family" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "postOffice" TEXT,
    "postomat" TEXT,

    CONSTRAINT "AdminSender_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AdminToAdminSender" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AdminToAdminSender_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_AdminSenderToOrder" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AdminSenderToOrder_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AdminToAdminSender_B_index" ON "_AdminToAdminSender"("B");

-- CreateIndex
CREATE INDEX "_AdminSenderToOrder_B_index" ON "_AdminSenderToOrder"("B");

-- AddForeignKey
ALTER TABLE "_AdminToAdminSender" ADD CONSTRAINT "_AdminToAdminSender_A_fkey" FOREIGN KEY ("A") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdminToAdminSender" ADD CONSTRAINT "_AdminToAdminSender_B_fkey" FOREIGN KEY ("B") REFERENCES "AdminSender"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdminSenderToOrder" ADD CONSTRAINT "_AdminSenderToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "AdminSender"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdminSenderToOrder" ADD CONSTRAINT "_AdminSenderToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
