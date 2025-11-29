-- CreateEnum
CREATE TYPE "TgRoles" AS ENUM ('GUEST', 'ADMIN', 'CLIENT');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELED');

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "visits" INTEGER NOT NULL DEFAULT 0,
    "sales" INTEGER NOT NULL DEFAULT 0,
    "avgCheck" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminMetric" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visits" INTEGER NOT NULL,
    "sales" INTEGER NOT NULL,
    "avgCheck" INTEGER NOT NULL,
    "yearSales" INTEGER NOT NULL,
    "allEarning" INTEGER NOT NULL,
    "users" INTEGER NOT NULL,
    "allClients" INTEGER NOT NULL,
    "allOrders" INTEGER NOT NULL,
    "lastOrders" BOOLEAN NOT NULL,
    "activity" BOOLEAN NOT NULL,
    "productRate" BOOLEAN NOT NULL,
    "activeOrders" BOOLEAN NOT NULL,
    "orderGeography" BOOLEAN NOT NULL,
    "returnCancel" BOOLEAN NOT NULL,
    "periods" BOOLEAN NOT NULL,
    "userMetrics" BOOLEAN NOT NULL,
    "sellMetrics" BOOLEAN NOT NULL,
    "sellOrder" BOOLEAN NOT NULL,
    "adminId" INTEGER NOT NULL,

    CONSTRAINT "AdminMetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "group" TEXT NOT NULL,
    "listPosition" INTEGER NOT NULL DEFAULT 0,
    "visible" BOOLEAN NOT NULL,
    "categoryImg" TEXT NOT NULL,
    "parentId" INTEGER,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryTranslation" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "groupText" TEXT NOT NULL,

    CONSTRAINT "CategoryTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "visible" BOOLEAN NOT NULL,
    "price" DOUBLE PRECISION,
    "stockState" BOOLEAN NOT NULL,
    "stockValue" INTEGER DEFAULT 0,
    "discountPercent" INTEGER,
    "wholesalePrice" INTEGER,
    "counterQuantity" INTEGER DEFAULT 1,
    "packageType" TEXT NOT NULL,
    "wholesaleOnly" BOOLEAN,
    "wholesaleFrom" INTEGER,
    "productSize" TEXT NOT NULL,
    "productWeight" TEXT NOT NULL,
    "productDensity" TEXT NOT NULL,
    "productCapacity" TEXT NOT NULL,
    "packageQuantity" TEXT NOT NULL,
    "groupPackQuantity" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductOptions" (
    "id" SERIAL NOT NULL,
    "optionId" INTEGER NOT NULL,
    "optionImg" TEXT NOT NULL,
    "optionPrice" DOUBLE PRECISION,

    CONSTRAINT "ProductOptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductImg" (
    "id" SERIAL NOT NULL,
    "imgId" INTEGER NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "ProductImg_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductTranslation" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "productDescription" TEXT,
    "wholesaleDescription" TEXT,
    "productColor" TEXT NOT NULL,
    "groupPackage" TEXT NOT NULL,
    "productMaterial" TEXT NOT NULL,

    CONSTRAINT "ProductTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductOptionsTranslation" (
    "id" SERIAL NOT NULL,
    "optionId" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "optionInfo" TEXT NOT NULL,

    CONSTRAINT "ProductOptionsTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PopularProduct" (
    "id" SERIAL NOT NULL,
    "adminId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PopularProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromotedProduct" (
    "id" SERIAL NOT NULL,
    "adminId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PromotedProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "userSurname" TEXT,
    "userAvatar" TEXT,
    "userFamily" TEXT,
    "email" TEXT,
    "phoneNumber" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" TEXT NOT NULL DEFAULT 'guest',
    "telegramId" TEXT,
    "telegramChatId" TEXT,
    "telegramRole" "TgRoles" DEFAULT 'CLIENT',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adress" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "homeAdress" TEXT NOT NULL,
    "postCompany" TEXT NOT NULL,
    "postOffice" TEXT NOT NULL,
    "postomat" TEXT NOT NULL,
    "postalCode" TEXT,
    "postIndex" TEXT NOT NULL,

    CONSTRAINT "Adress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSetting" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "setting" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "UserSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "isReaded" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "userId" INTEGER,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentMethod" TEXT,
    "totalPrice" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShippingInfo" (
    "id" SERIAL NOT NULL,
    "orderId" TEXT NOT NULL,
    "recipient" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "deliveryMethod" TEXT,
    "postCompany" TEXT,
    "postOffice" TEXT,
    "postomat" TEXT,
    "city" TEXT NOT NULL,
    "address" TEXT,
    "country" TEXT NOT NULL,

    CONSTRAINT "ShippingInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "visible" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_group_key" ON "Category"("group");

-- CreateIndex
CREATE INDEX "Category_parentId_idx" ON "Category"("parentId");

-- CreateIndex
CREATE INDEX "CategoryTranslation_categoryId_idx" ON "CategoryTranslation"("categoryId");

-- CreateIndex
CREATE INDEX "CategoryTranslation_language_idx" ON "CategoryTranslation"("language");

-- CreateIndex
CREATE INDEX "Product_categoryId_idx" ON "Product"("categoryId");

-- CreateIndex
CREATE INDEX "Product_price_idx" ON "Product"("price");

-- CreateIndex
CREATE INDEX "ProductOptions_optionId_idx" ON "ProductOptions"("optionId");

-- CreateIndex
CREATE INDEX "ProductImg_imgId_idx" ON "ProductImg"("imgId");

-- CreateIndex
CREATE INDEX "ProductTranslation_productId_idx" ON "ProductTranslation"("productId");

-- CreateIndex
CREATE INDEX "ProductTranslation_language_idx" ON "ProductTranslation"("language");

-- CreateIndex
CREATE INDEX "ProductOptionsTranslation_optionId_idx" ON "ProductOptionsTranslation"("optionId");

-- CreateIndex
CREATE INDEX "ProductOptionsTranslation_language_idx" ON "ProductOptionsTranslation"("language");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_telegramId_key" ON "User"("telegramId");

-- CreateIndex
CREATE UNIQUE INDEX "User_telegramChatId_key" ON "User"("telegramChatId");

-- CreateIndex
CREATE INDEX "User_phoneNumber_idx" ON "User"("phoneNumber");

-- CreateIndex
CREATE INDEX "Adress_userId_idx" ON "Adress"("userId");

-- CreateIndex
CREATE INDEX "UserSetting_userId_idx" ON "UserSetting"("userId");

-- CreateIndex
CREATE INDEX "Notification_userId_idx" ON "Notification"("userId");

-- CreateIndex
CREATE INDEX "Order_userId_idx" ON "Order"("userId");

-- CreateIndex
CREATE INDEX "Order_status_idx" ON "Order"("status");

-- CreateIndex
CREATE INDEX "OrderItem_orderId_idx" ON "OrderItem"("orderId");

-- CreateIndex
CREATE INDEX "OrderItem_productId_idx" ON "OrderItem"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "ShippingInfo_orderId_key" ON "ShippingInfo"("orderId");

-- CreateIndex
CREATE INDEX "ShippingInfo_city_idx" ON "ShippingInfo"("city");

-- CreateIndex
CREATE INDEX "ShippingInfo_country_idx" ON "ShippingInfo"("country");

-- CreateIndex
CREATE INDEX "News_createdAt_idx" ON "News"("createdAt");

-- AddForeignKey
ALTER TABLE "AdminMetric" ADD CONSTRAINT "AdminMetric_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryTranslation" ADD CONSTRAINT "CategoryTranslation_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOptions" ADD CONSTRAINT "ProductOptions_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImg" ADD CONSTRAINT "ProductImg_imgId_fkey" FOREIGN KEY ("imgId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductTranslation" ADD CONSTRAINT "ProductTranslation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOptionsTranslation" ADD CONSTRAINT "ProductOptionsTranslation_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "ProductOptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PopularProduct" ADD CONSTRAINT "PopularProduct_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PopularProduct" ADD CONSTRAINT "PopularProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotedProduct" ADD CONSTRAINT "PromotedProduct_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotedProduct" ADD CONSTRAINT "PromotedProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adress" ADD CONSTRAINT "Adress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSetting" ADD CONSTRAINT "UserSetting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShippingInfo" ADD CONSTRAINT "ShippingInfo_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
