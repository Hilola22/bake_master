/*
  Warnings:

  - You are about to drop the column `paymentId` on the `promocodes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."promocodes" DROP CONSTRAINT "promocodes_paymentId_fkey";

-- AlterTable
ALTER TABLE "public"."payment" ADD COLUMN     "promocodesId" INTEGER;

-- AlterTable
ALTER TABLE "public"."promocodes" DROP COLUMN "paymentId";

-- AddForeignKey
ALTER TABLE "public"."payment" ADD CONSTRAINT "payment_promocodesId_fkey" FOREIGN KEY ("promocodesId") REFERENCES "public"."promocodes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
