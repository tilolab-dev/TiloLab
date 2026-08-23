/*
  Warnings:

  - You are about to drop the `AnswersArr` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TagAnswers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TagArr` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TagItems` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AnswersArr" DROP CONSTRAINT "AnswersArr_tagAnswersId_fkey";

-- DropForeignKey
ALTER TABLE "TagAnswers" DROP CONSTRAINT "TagAnswers_productId_fkey";

-- DropForeignKey
ALTER TABLE "TagArr" DROP CONSTRAINT "TagArr_tagAnswersId_fkey";

-- DropForeignKey
ALTER TABLE "TagItems" DROP CONSTRAINT "TagItems_productId_fkey";

-- DropTable
DROP TABLE "AnswersArr";

-- DropTable
DROP TABLE "TagAnswers";

-- DropTable
DROP TABLE "TagArr";

-- DropTable
DROP TABLE "TagItems";

-- DropEnum
DROP TYPE "ProductTag";

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "tagId" TEXT NOT NULL,
    "tagName" TEXT NOT NULL,
    "tagGender" "TagGenderType" NOT NULL DEFAULT 'UNDEFINED',

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductTag" (
    "productId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "ProductTag_pkey" PRIMARY KEY ("productId","tagId")
);

-- CreateTable
CREATE TABLE "QuizQuestion" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "isMultiply" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "QuizQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizAnswer" (
    "id" SERIAL NOT NULL,
    "answer" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,

    CONSTRAINT "QuizAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizAnswerTag" (
    "answerId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "QuizAnswerTag_pkey" PRIMARY KEY ("answerId","tagId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_tagId_key" ON "Tag"("tagId");

-- CreateIndex
CREATE INDEX "ProductTag_tagId_idx" ON "ProductTag"("tagId");

-- CreateIndex
CREATE INDEX "QuizAnswerTag_tagId_idx" ON "QuizAnswerTag"("tagId");

-- AddForeignKey
ALTER TABLE "ProductTag" ADD CONSTRAINT "ProductTag_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductTag" ADD CONSTRAINT "ProductTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizAnswer" ADD CONSTRAINT "QuizAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "QuizQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizAnswerTag" ADD CONSTRAINT "QuizAnswerTag_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "QuizAnswer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizAnswerTag" ADD CONSTRAINT "QuizAnswerTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
