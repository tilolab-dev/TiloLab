/*
  Warnings:

  - Added the required column `city` to the `AdminSender` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AdminSender" ADD COLUMN     "city" TEXT NOT NULL;
